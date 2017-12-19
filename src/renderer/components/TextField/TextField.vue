<template>
  <div class="text-field">
    <!-- <div class="icon"></div> -->
    <div class="text-field-content" :class="textFieldClass">
      <div class="text-field-label" :class="labelClass">{{ labelText }}</div>
      <input type="text"
        v-model="inputValue"
        class="text-field-input"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleChange"/>
      <transition name=""></transition>
      <div v-if="errorHint" class="error-hint">{{ errorHint }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  data () {
    return {
      isFocus: false,
      inputValue: this.value
    }
  },
  props: {
    value: '',
    labelText: {
      type: String
    },
    errorHint: {
      type: String
    }
  },
  computed: {
    textFieldClass () {
      return {
        'focus': this.isFocus,
        // 'has-label': this.label,
        'no-empty-state': this.inputValue
        // 'has-icon': this.icon,
        // 'error': this.errorText,
        // 'multi-line': this.multiLine,
        // 'disabled': this.disabled,
        // 'full-width': this.fullWidth
      }
    },
    labelClass () {
      return { float: this.inputValue || this.isFocus }
    }
  },
  methods: {
    handleFocus () {
      this.isFocus = true
    },
    handleBlur () {
      this.isFocus = false
    },
    handleChange () {
      this.$emit('input', this.inputValue)
    }
  }
}
</script>

<style scoped>
.text-field {
}

.text-field-content {
  position: relative;
}

.text-field-label {
  top: 6px;
  line-height: 20px;
  position: absolute;
  color: #cecece;
  transform-origin: left top;
  transform: translate3d(0, 0, 0) scale(1);
  opacity: 1;
  transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1;
}

.text-field-label.float {
  transform: translate3d(0, -6px, 0) scale(0);
  opacity: 0;
}
.error-hint {
  width: 126%;
  font-size: 12px;
  line-height: 24px;
  color: #d64073;
  transform-origin: left top;
  transform: scale(0.8);
}

.text-field-input {
  appearance: none;
  outline: none;
  border: none;
  background: none;
  border-radius: 0 0 0 0;
  box-shadow: none;
  display: block;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 32px;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  font-family: inherit;
  font-family: inherit;
  position: relative;
  z-index: 2;
}
</style>


