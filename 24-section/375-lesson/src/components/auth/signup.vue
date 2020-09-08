<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input" :class="{invalid: $v.email.$error}">
          <label for="email">Mail</label>
          <!-- <input
                  type="email"
                  id="email"
                  v-model="email"
                  @input="$v.email.$touch()">
          <p v-if="!$v.email.email">Please provide a valid email address.</p>
          <p v-if="!$v.email.required">The field must be not empty.</p> -->
          <input
                  type="email"
                  id="email"
                  v-model="email"
                  @blur="$v.email.$touch()">
          <p v-if="$v.email.$error && !$v.email.email">Please provide a valid email address.</p>
          <p v-if="$v.email.$error && !$v.email.required">The field must be not empty.</p>
		  <p>{{$v.email}}</p>
		  <p>{{$v.email.$params.sameAs}}</p>
        </div>
        <div class="input" :class="{invalid: $v.age.$error}">
          <label for="age">Your Age</label>
          <input
                  type="text"
                  id="age"
                  v-model.number="age"
                  @blur="$v.age.$touch()">
          <p v-if="$v.age.$error && !$v.age.required">The field must be not empty.</p>
          <p v-if="$v.age.$error && !$v.age.numeric">Please provide a valid number.</p>
          <p v-if="$v.age.$error && !$v.age.minVal">You have to be at least {{ $v.age.$params.minValue.min }} years old.</p>
        </div>
        <div class="input" :class="{invalid: $v.password.$error}">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password"
                  @blur="$v.password.$touch()">
        </div>
        <div class="input" :class="{invalid: $v.confirmPassword.$error}">
          <label for="confirm-password">Confirm Password</label>
          <input
                  type="password"
                  id="confirm-password"
                  v-model="confirmPassword"
                  @blur="$v.confirmPassword.$touch()">
        </div>
        <div class="input">
          <label for="country">Country</label>
          <select id="country" v-model="country">
            <option value="usa">USA</option>
            <option value="india">India</option>
            <option value="uk">UK</option>
            <option value="germany">Germany</option>
          </select>
        </div>
        <div class="hobbies">
          <h3>Add some Hobbies</h3>
          <button @click="onAddHobby" type="button">Add Hobby</button>
          <div class="hobby-list">
            <div
                    class="input"
                    v-for="(hobbyInput, index) in hobbyInputs"
                    :key="hobbyInput.id"
					:class="{invalid: $v.hobbyInputs.$each[index].$error}">
              <label :for="hobbyInput.id">Hobby #{{ index }}</label>
              <input
                      type="text"
                      :id="hobbyInput.id"
                      v-model="hobbyInput.value"
					  @blur="$v.hobbyInputs.$each[index].value.$touch()">
              <button @click="onDeleteHobby(hobbyInput.id)" type="button">X</button>
            </div>
			<p v-if="!$v.hobbyInputs.minLength">You have to specify at lease {{ $v.hobbyInputs.$params.minLength.min }} hobbies.</p>
			<p v-if="!$v.hobbyInputs.required">Please add hobbies.</p>
          </div>
        </div>
        <div class="input inline" :class="{invalid: $v.terms.$error}">
			<input 
				type="checkbox" 
				id="terms" 
				v-model="terms"
				@blur="$v.terms.$touch()">
			<label for="terms">Accept Terms of Use</label>
        </div>
        <div class="submit">
        	<button type="submit" :disabled="$v.$anyError">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  	import {required, email, numeric, minValue, minLength, sameAs} from 'vuelidate/lib/validators'
	import globalAxios from 'axios'

  export default {
    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        country: 'usa',
        hobbyInputs: [],
        terms: false
      }
	},
	computed: {
		
	},
    validations: {
      email: {
        required,
		email,
		unique: (val, vm) => {
			let result = vm.$store.dispatch('isUnique', vm.email)
			console.log(result)
			return result
			// return globalAxios.get('/users.json?orderBy="email"&equalTo="' + val + '"')
			// 		.then( res => {
			// 			console.log(res)
			// 			//return true se l'oggetto risposta è vuoto
			// 			return Object.keys(res.data).length === 0
			// 		})
			// 		.catch( err => {
			// 			console.log(err)
			// 			return false
			// 		})
		}
      },
      age: {
        required,
        numeric,
        minValue: minValue(18)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        // sameAs: sameAs('password') //Il nome della proprietà della vue instance
        sameAs: sameAs(vm => { 
          //riceve la vue instance come parametro e restituisce il valore con cui deve essere confrontato
          // return vm.password + 'b'
          return vm.password
        })
      },
      terms: {
        checkedCustom(val){
			return this.country === 'germany' ? true : val
		}
	  },
	  hobbyInputs: {
		  required,
		  minLength: minLength(2),
		  $each: {
			  value: {
				  required,
				  minLength: minLength(5)
			  }
		  }
	  }
    },
    methods: {
		onAddHobby () {
			const newHobby = {
			id: Math.random() * Math.random() * 1000,
			value: ''
			}
			this.hobbyInputs.push(newHobby)
		},
		onDeleteHobby (id) {
			this.hobbyInputs = this.hobbyInputs.filter(hobby => hobby.id !== id)
		},
		onSubmit () {
			const formData = {
			email: this.email,
			age: this.age,
			password: this.password,
			confirmPassword: this.confirmPassword,
			country: this.country,
			hobbies: this.hobbyInputs.map(hobby => hobby.value),
			terms: this.terms
			}
			console.log(formData);
			this.$store.dispatch('signup', formData);
		}
    }
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #521751;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .input.invalid input{
    border: 1px solid red;
    background-color: #ffc9aa;
  }

  .input.invalid label{
    color: red;
  }

  .hobbies button {
    border: 1px solid #521751;
    background: #521751;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: #8d4288;
  }

  .hobbies input {
    width: 90%;
  }

  .submit button {
    border: 1px solid #521751;
    color: #521751;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #521751;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }
</style>