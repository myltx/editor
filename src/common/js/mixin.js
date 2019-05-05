import {debounce} from 'common/js/util'

export const inputMixin = {
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    keyName: {
      type: String,
      default: ''
    },
    defaultNum: {
      type: Number,
      default: NaN
    },
    args: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      query: ''
    }
  },
  mounted() {
    if (!isNaN(this.defaultNum)) {
      this.setQuery(this.defaultNum)
    }
  },
  methods: {
    setQuery(query) {
      this.query = query
    },
    queryChange: debounce(function() {
      let query = this.query
      if (!this._isNum(query)) {
        this.setQuery(0)
        return
      }
      if (this.isPositive && !this._isPositive(query)) {
        this.setQuery(0)
        return
      }
      if (this.keyName) {
        this.$emit('query', {[this.keyName]: query})
        return
      }
      // 动画部分需要
      if (this.args.id) {
        this.$emit('query', {args: this.args, query: query})
        return
      }
      this.$emit('query', query)
    }, 200),
    _isNum(num) {
      if (isNaN(num) || num === '') {
        return false
      }
      return true
    }
  }
}

export const elMixin = {
  methods: {
    formatURL(url) {
      if (window._isServerRender === false) {
        url = `./static/media/${url.split('/').pop()}`
      }
      return url
    }
  }
}