<template>

  <div id="app">
    <div id="pell"></div>
      <div>
        Text output:
        <div id="text-output"></div>
        HTML output:
        <pre id="html-output"></pre>
      </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
// ES6
import pell from 'pell'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    init () {
      const editor = pell.init({
        element: document.getElementById('pell'),
        onChange: html => {
          document.getElementById('text-output').innerHTML = html
          document.getElementById('html-output').textContent = html
        },
        styleWithCSS: true,
        actions: [
          {
            name: 'color',
            icon: '<b>C</b>',
            title: 'color',
            result: () => pell.exec('ForeColor', 'red')
          },
          {
            // 放大到20px
            name: 'Large',
            icon: '<b style=\'font-size:20px;\'>A</b>',
            title: 'Large',
            result: () => pell.exec('FontSize', '20px')
          },
          {
            // 打印
            name: 'print',
            icon: '<b style=\'font-size:10px;\'>P</b>',
            title: 'print',
            result: () => pell.exec('print')
          },
          {
            // 再扩展一个alert
            name: 'Delete',
            icon: '<b>V</b>',
            title: 'Delete',
            result: () => alert('Vue')
          },
          {
            // 扩展一个删除方法
            name: 'Delete',
            icon: '<b>D</b>',
            title: 'Delete',
            result: () => pell.exec('Delete')
          },
          'bold',
          'underline',
          {
            name: 'italic',
            result: () => pell.exec('italic')
          },
          {
            // 扩展一个console.log方法
            name: 'custom',
            icon: '<b><u><i>C</i></u></b>',
            title: 'Custom Action',
            result: () => console.log('YOLO')
          },
          {
            name: 'image',
            result: () => {
              const url = window.prompt('Enter the image URL')
              console.log(url)
              // if (url) pell.exec('insertImage', ensureHTTP(url))
            }
          },
          {
            name: 'link',
            result: () => {
              const url = window.prompt('Enter the link URL')
              console.log(url)
              // if (url) pell.exec('createLink', ensureHTTP(url))
            }
          }
        ],
        classes: {
          actionbar: 'pell-actionbar',
          button: 'pell-button',
          content: 'pell-content'
        }
      })

      // editor.content<HTMLElement>
      // To change the editor's content:
      editor.content.innerHTML = '<b><u><i>Initial content!</i></u></b>'
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.pell {
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  box-sizing: border-box;
  width: 100%; }

.pell-content {
  box-sizing: border-box;
  height: 300px;
  outline: 0;
  overflow-y: auto;
  padding: 10px;
  width: 100%; }

.pell-actionbar {
  background-color: #FFF;
  border-bottom: 1px solid rgba(10, 10, 10, 0.1);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 100%; }

.pell-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 30px;
  outline: 0;
  width: 30px; }

</style>
