<template>
    <div>
        <h3 class="page-header">Форма обратной связи</h3>
        <form v-on:submit.prevent="submit">
            <div>
                <div class="form-group" style="width: 300px;">
                    <label>Имя</label>
                    <input v-model="name" type="text" class="form-control" required/>
                </div>
                <div class="form-group" style="width: 300px;">
                    <label>Телефон</label>
                    <the-mask v-model="phone" class="form-control" :mask="['# (###) ###-##-##']" required />
                </div>

                <div class="form-group" style="width: 300px;">
                    <label>E-mail</label>
                    <input v-model="email" type="email" class="form-control" required/>
                </div>
                <div class="form-group" style="width: 300px;">
                    <label>Сообщение</label>
                    <textarea v-model="message" class="form__control" rows="5" style="width: 600px;" required></textarea>
                </div>
                <div v-if="errorMessage" class="form-group" style="width: 300px;">
                    {{errorMessage}}
                </div>
                <button class="btn btn-primary">Отправить</button>
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import {TheMask} from 'vue-the-mask'
    export default {
        name: 'the-content-feedback-form',
        data: function () {
            return {
                name:'',
                phone:'',
                email:'',
                message:'',
                errorMessage:'',
            }
        },
        components: {
            TheMask
        },
        methods: {
            submit: function () {
                axios.post('/api/feedback/add', {
                    name:this.name,
                    phone:this.phone,
                    email:this.email,
                    message:this.message,
                }).then((response) => {
                    if (response.message){
                        alert('kekas');
                        return;
                    }
                    if (response.data.result){
                        if (!this.sendMail()){
                            this.errorMessage='Ошибка. Письмо не доставлено';
                            return;
                        }
                        if (!this.createLead()){
                            if (!this.sendSMS()){
                                this.errorMessage='Ошибка. Невозможно создать лид/отправить СМС';
                                return;
                            }
                        }
                        this.$router.push({ name: 'the-content-thankyou-form' });
                    }else{
                        this.errorMessage='Ошибка отправки';
                    }
                }).catch(error => {
                    this.errorMessage='';
                    console.log(error.response.data.errors);
                    if (error.response.data.errors.phone){
                        this.errorMessage+='Телефон введен некорректно\r\n';
                    }
                    if (error.response.data.errors.email){
                        this.errorMessage+='Почта введена некорректно\r\n';
                    }
                })
            },
            sendMail: function(){
                return true;
            },
            createLead: function(){
                return true;
            },
            sendSMS: function(){
                return true;
            }
        },
    }
</script>