<script>
import ajax from './ajax'

export default {
  name: 'Upload',
  data () {
    return {
      reqs: {}
    }
  },
  props: {
    autoUpload: {
      type: Boolean,
      default: true
    },
    headers: Object,
    withCredentials: Object,
    data: Object,
    name: {
      type: String,
      default: 'file'
    },
    action: {
      type: String,
      required: true
    },
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    httpRequest: {
      type: Function,
      default: ajax
    }
  },
  methods: {
    uploadFiles (files) {
      let postFiles = Array.prototype.slice.call(files)
      postFiles.forEach(rawFile => {
        this.onStart(rawFile)
        if (this.autoUpload) this.upload(rawFile)
      })
    },
    onStart (rawFile) {
      console.log('onStart', rawFile)
    },
    upload (rawFile) {
      console.log('upload', rawFile)
      return this.post(rawFile)
    },
    post (rawFile) {
      const { uid } = rawFile
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: rawFile,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.onProgress(e, rawFile);
        },
        onSuccess: res => {
          this.onSuccess(res, rawFile);
          delete this.reqs[uid];
        },
        onError: err => {
          this.onError(err, rawFile);
          delete this.reqs[uid];
        }
      };
      const req = this.httpRequest(options);
      this.reqs[uid] = req;
      if (req && req.then) {
        req.then(options.onSuccess, options.onError);
      }
    }
  }
}
</script>
