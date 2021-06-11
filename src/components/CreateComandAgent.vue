<template>
    <q-page class="flex items-center column">
        <h3 class="q-mb-xl desktop-only">Список пользователей</h3>
        <h4 class="q-mb-md mobile-only text-center">Список пользователей</h4>
        <div>
        <q-btn
        class="q-mb-md self-start"
        v-go-back=" '/'"
        replace
        color="primary"
        label="Назад"
        flat
        />
        <q-table
            class="q-mx-sm"
            :data="data"
            :grid="$q.screen.lt.lg"
            :columns="columns"
            row-key="name"
            hide-bottom
            separator="cell"
            :rows-per-page-options="[0]">
            <template  v-slot:body="props" >
                <q-tr :props="props">
                <q-td key="Name" :props="props">
                    {{ props.row.Name }}
                </q-td>
                <q-td key="Login" :props="props">
                    {{ props.row.Login }}
                </q-td>
                <q-td key="Password" :props="props">
                    {{ props.row.Password }}
                </q-td>
                <q-td  @click="CopyText(props.row.CodeCreate)" key="CodeCreate" :props="props" readonly>
                    {{ props.row.CodeCreate}}
                </q-td>
                <q-td class="non-selectable" @click="CopyText(props.row.CodeDelete)" key="CodeDelete" :props="props">
                    {{ props.row.CodeDelete }}
                </q-td>
                </q-tr>
            </template>
            <template v-slot:item="props" class="box">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-6 col-lg-3 grid-style-transition">
              <q-card >
                <q-separator />
                    <q-list dense style="max-height:300px">
                        <q-item >
                            <q-item-section class="q-mt-sm">
                                <q-item-label caption>{{props.cols[0].label}}</q-item-label>
                                <q-item-label>{{ props.row.Name }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item >
                            <q-item-section>
                                <q-item-label caption>{{props.cols[1].label}}</q-item-label>
                                <q-item-label>{{ props.row.Login }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item >
                            <q-item-section class="q-mb-md">
                                <q-item-label caption>{{props.cols[2].label}}</q-item-label>
                                <q-item-label>{{ props.row.Password }}</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
              </q-card>
            </div>
          </template>

        </q-table>
        </div>
    </q-page>
</template>

<script>
import { copyToClipboard } from 'quasar'
export default {
    name:'CreateComandAgent',
    props:['textComand'],
    data() {
    return{
      text: this.textComand,
      data: [],
      columns: [
        {
            "name" : "Name",
            "required" : true,
            "label" : "ФИО",
            "align" : "left",
            "field" :"Name",
            "sortable" :false,
        },
        {
            "name" : "Login",
            "required" : true,
            "label" : "Логин",
            "align" : "left",
            "field" :"Login",
            "sortable" :false,
        },
        {
            "name" : "Password",
            "required" : true,
            "label" : "Первичный пароль",
            "align" : "left",
            "field" :"Password",
            "sortable" :false,
        },
        {
            "name" : "CodeCreate",
            "required" : false,
            "label" : "Код для ручного создания пользователей на ПК",
            "align" : "left",
            "field" :"CodeCreate",
            "sortable" :false,
        },
        {
            "name" : "CodeDelete",
            "required" : false,
            "label" : "Код для удаления пользователей на ПК",
            "align" : "left",
            "field" :"CodeDelete",
            "sortable" :false,
        },
      ]
    }
  },
  mounted(){
      this.convert(this.text)
  },
  methods: {
        copyToClipboard,
        CopyText: function (word) {
            copyToClipboard(word)
            .then(() => {
                alert("Код скопирован")
            })
        },
        convert: function (wordLines) {
            var FIO = String(wordLines).split('\n')
            FIO = FIO.filter(word => word.length >0)
            var FIOConvert = []
            var converter = {
            'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
            'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
            'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
            'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
            'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
            'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
            'э': 'e',    'ю': 'yu',   'я': 'ya',

            'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
            'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
            'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
            'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
            'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
            'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
            'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
            };
            for (var i = 0; i<FIO.length; i++){
                var word = String(FIO[i]).split(' ').map(word => word[0].toUpperCase() + word.substring(1))
                FIO[i] = word.join(' ')
                word = word.splice(0,1) + word.map((w) => {return w[0]}).join('')
                var login = ''
                for(var symbol=0; symbol<word.length; symbol++ ){
                    if (converter[word[symbol]] == undefined){
                        login += word[symbol];
                    } else {
                        login += converter[word[symbol]];
                    }
                }
                FIOConvert.push({
                    'Name':FIO[i],
                    'Login':login,
                    'Password':'p@ssword1!',
                    'CodeCreate':'net user '+login+' p@ssword1!/add /comment:"Агентская УЗ" /fullname:"'+FIO[i]+'" /logonpasswordchg:yes',
                    'CodeDelete':'net user '+login+' /DELETE',
                    })
            }
            this.data = FIOConvert

      }
  }

}
</script>

<style>

</style>