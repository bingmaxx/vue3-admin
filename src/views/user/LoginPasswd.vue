<script setup lang="ts">
  import { apiGetCaptcha } from '@/api/common'
  import { text } from '@/utils/public'
  import { ref } from 'vue';

  interface LoginForm {
    name: string;
    password?: string;
    captcha_id?: string;
    captcha_res?: string;
  }
  const loginForm = ref<LoginForm>({
    name: '',
    password: '',
    captcha_id: '',
    captcha_res: ''
  })
  const captcha_url = ref('');

  const getCaptcha = async (): Promise<void> => {
    try {
      const res = await apiGetCaptcha()
      captcha_url.value = res?.data?.data;
      loginForm.value.captcha_id = res?.data?.captcha_id;
    } catch (error) {
      console.log('[error]: ', error)
    }
  }

  const handleLogin = () => {
    const data = {
      name: loginForm.value.name.trim(),
      password: loginForm.value.password,
      captcha_id: loginForm.value.captcha_id,
    };
    console.log('[data]: ', data);
  }

  getCaptcha()
</script>

<template>
  <div class="container">
    <div class="login">
      <img src="@/assets/logo.png">
      <h4>{{ text.slogen }}</h4>

      <a-form :model="loginForm" autocomplete="off">
        <a-form-item name="name" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input size="large" v-model:value="loginForm.name" placeholder="用户名"/>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password hash-priority="high" size="large" v-model:value="loginForm.password" placeholder="密码"/>
        </a-form-item>

        <a-form-item name="captcha_res" :rules="[{ required: true, message: '请输入验证码' }]">
          <a-input size="large" v-model:value="loginForm.captcha_res" placeholder="验证码"/>
        </a-form-item>

        <a-form-item name="svg" @click="getCaptcha">
          <div class="line">
            <div class="svg" v-html="captcha_url"></div>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button size="large" type="primary" shape="round" @click="handleLogin">登 陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: $layout-bg;
  @include flex-row(center, center);

  .login {
    width: 460px;
    height: 640px;
    border-radius: 8px;
    background-color: white;
    @include flex-column(flex-start, center);

    img {
      margin-top: 60px;
      $w: 60px;
      width: $w;
      height: $w;
    }

    h4 {
      margin: 20px 0 60px;
      font-size: 26px;
      color: $c-primary;
    }

    form {
      width: 400px;
      text-align: center;
      // input {
      //   border-color: $c-b3;
      // }
      .line {
        height: 38px;
        overflow: hidden;
        @include flex-row(center, center);
        background-color: rgb(242, 246, 252);
        border-radius: 8px;
        border: 1px solid $c-b3;;
      }
      button {
        margin-top: 12px;
        width: 60%;
      }
    }
  }
}

@media (max-width: $screen-xs-max) {
  .container {
    background-color: white;
    .login {
      width: 100%;
      height: 100vh;
      padding: 32px;
      form {
        width: 100%;
      }
    }
  }
}
</style>