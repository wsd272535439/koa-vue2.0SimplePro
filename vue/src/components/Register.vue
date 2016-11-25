<template>
    <div id='login'>
        <div class="loginCard">
            <div class="loginItem">
				<div style="flex: 1;text-align: left">
					<div style="color: #333333;font-weight: bold;font-size: 14px;margin-bottom: 4px">用户名*</div>
					<input v-model="name" type="text" class="inputStyle" style="width: 90%" placeholder="用户名">
				</div>

				<div style="flex: 1;margin-left: 15px;text-align: left">
					<div style="color: #333333;font-weight: bold;font-size: 14px;margin-bottom: 4px">性别*</div>
					<input v-model="sex" type="text" class="inputStyle" style="width: 90%" placeholder="选择性别">
				</div>
            </div>

			<div class="loginItem" style="margin-top: 15px">
				<div style="flex: 1;text-align: left">
					<div style="color: #333333;font-weight: bold;font-size: 14px;margin-bottom: 4px">密码*</div>
					<input v-model="password" type="text" class="inputStyle" style="width: 90%" placeholder="密码">
				</div>

				<div style="flex: 1;margin-left: 15px;text-align: left">
					<div style="color: #333333;font-weight: bold;font-size: 14px;margin-bottom: 4px">重复密码*</div>
					<input v-model="re_password" type="text" class="inputStyle" style="width: 90%" placeholder="重复密码">
				</div>
			</div>

			<div style="margin-top: 15px;text-align: center">
				<div style="text-align: left">
					<div style="color: #333333;font-weight: bold;font-size: 14px;margin-bottom: 4px">邮箱*</div>
					<input v-model="email" type="text" class="inputStyle" style="width: 95%" placeholder="邮箱">
				</div>
			</div>

			<div style="margin-top: 15px;text-align: center">
				<div style="text-align: left">
					<div style="color: #333333;font-weight: bold;font-size: 14px;margin-bottom: 4px">个人签名</div>
					<input v-model="signature" type="text" class="inputStyle" style="width: 95%" placeholder="限制在50字以内">
				</div>
			</div>

			<div v-on:click="submitRegister">
				<mt-button type="default" style="width: 100%;margin-top: 15px;font-size: 12px;height: 35px">注册</mt-button>
			</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'register',
  data () {
    return {
      name: '',
      sex: '',
      password: '',
      re_password: '',
      email: '',
      signature: '',
      ssd: '222'
    }
  },
  methods: {
    submitRegister () {
      let data = {name: this.name, gender: this.sex, password: this.password, re_password: this.re_password, email: this.email, signature: this.signature}
      this.$http.post('http://localhost:3000/signup', data).then(response => {
        if (response.data.code === 0) {
          this.$toast(response.data.message)
          window.localStorage.setItem('user', JSON.stringify(response.data.data))
          console.log(window.localStorage.getItem('user'))
        } else {
          this.$toast(response.data.error)
        }
      }, reponse => {

      })
    }
  }
}
</script>

<style>
	<!-- Add "scoped" attribute to limit CSS to this component only -->
	ul {
		list-style-type: none;
		padding: 0;
	}

	#login{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		background-color: #f2f2f2;
		text-align: center;
		width: 100%;
		height: 100%;
	}

	.loginCard{
		width: 50%;
		background-color: white;
		padding: 12px 6px 12px 6px;
	}

	.loginItem{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		justify-content: space-between;
	}

	.inputStyle{
		border: 1px dashed #e8e8e8;
		padding: 8px;
	}
</style>