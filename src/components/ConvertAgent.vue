<template>
  <q-page class="flex justify-around bg-grey-1">
    <form @submit.prevent.stop="onSubmit">
      <div class="flex items-center column q-mx-md">
          <h3 class="q-mb-sm desktop-only">Создание списка агентов</h3>
          <h4 class="q-mb-sm mobile-only text-center">Создание списка агентов</h4>
          <q-input class="self-stretch" v-model="pc" type="text" label="Имя ПК" />
          <h5 class="q-my-lg desktop-only">1 строка = ФИО агента полностью</h5>
          <div class="q-my-md mobile-only text-center text-subtitle1">
            1 строка = ФИО агента полностью
            <div class="text-center row justify-center">
              (Не забудьте нажать кнопку <div class="q-ml-sm" style="font-size:30px;">&#8629;</div>
              при переходе на новую строку)
            </div>
          </div>
          <q-input
            class="self-stretch"
            ref="fio"
            clearable
            label="Введите ФИО"
            bg-color=blue-2
            v-model="text"
            filled
            autogrow
            lazy-rules
            :rules="[
              val=>val && val.length>0 || 'Введите хотя бы одно ФИО',
              check
              ]"
          />
          <q-file
            class="desktop-only"
            v-model="filetxt"
            clearable
            filled
            label="Загрузить файл .txt"
            accept=".txt"
            @input="onInput"
          >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
          </q-file>
          <q-btn type="submit" class="q-mt-md" color="white" text-color="black" icon="check" label="Отправить" />
      </div>
    </form>
    <div class="flex column ">
      <h3 class="q-mb-md text-center desktop-only">Статус обработки</h3>
      <h4 class="mobile-only">Статус обработки</h4>
        <q-table
        class="q-mb-md col-auto"
        :data="data"
        :columns="columns"
        row-key="name"
        hide-bottom
        separator="cell"
        style="columns"
        :rows-per-page-options="[0]"
        >
          <template  v-slot:body="props" >
            <q-tr :props="props">
              <q-td key="PC" :props="props">
                  {{ props.row.PC }}
              </q-td>
              <q-td key="Status" :props="props">
                <q-badge :color="props.row.Status==='Завершено' ? 'teal':'negative'">
                  {{ props.row.Status }}
                </q-badge>
              </q-td>
            </q-tr>
          </template>
        </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'ConvertAgent',
  methods:{
    check: function (word) {
      var FIO = word.split('\n').filter(w => w.length >0)
      var regExp = /^[а-яА-Я]{0,}\s[а-яА-Я]{1,}(\s[а-яА-Я]{1,})?$/
      for(var i=0; i<FIO.length; i++){
        if (!regExp.test(FIO[i])){
          return 'Вы ввели неправильное ФИО'
        }
      }
      return true
    },
    onSubmit () {
      this.$refs.fio.validate()
      if (this.$refs.fio.hasError) {
        this.formHasError = true
      }
      else {
        this.$router.push({name:'CreateComandAgent', params:{'textComand':this.text}})
      }
    },
    onInput (file) {
      if (file){
        this.filetxt = file
        var reader = new FileReader()
        reader.onload = () => (this.text = reader.result.replace(/\r/g,''))
        reader.readAsText(file)
      }
      else{
        this.filetxt = null
      }
    }
  },
  data() {
    return{
      filetxt: null,
      pc: null,
      text: null,
      data: [
        {
          'PC':'ПK-300',
          'Status':'Завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Не завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Не завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Не завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Не завершено'
        },
        {
          'PC':'ПK-300',
          'Status':'Завершено'
        },
      ],
      columns:[
        {
            "name" : "PC",
            "required" : true,
            "label" : "ПК",
            "align" : "left",
            "field" :"PC",
            "sortable" :true,
        },
        {
            "name" : "Status",
            "required" : true,
            "label" : "Статус",
            "align" : "left",
            "field" :"Status",
            "sortable" :true,
        },
      ]
    }
  }
}
</script>

<style>
.columns{
  min-width:288px;
}
</style>
