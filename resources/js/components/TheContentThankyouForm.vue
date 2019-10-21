<template>
    <div class="feedback-success">
        <h3 class="page-header">Данные успешно отправлены</h3>
        <router-link :to="{name: 'the-content-feedback-form'}" class="nav-link"><span class="menu__name">Вернуться на главную страницу</span></router-link>
    </div>
</template>
<style>
    .feedback-success{
        margin-top: 15%;
        text-align: center;
    }
</style>