<template>
  <div>

    <van-nav-bar title="编辑地址" left-arrow @click-left="$router.go(-1)" />
    <div v-if="addresslist.length">
      <van-address-list v-model="chosenAddressId" :list="addresslist" default-tag-text="默认" @add="onAdd" @edit="onEdit" />

    </div>
    <div v-else>
      空空如也
    </div>
    <van-action-sheet  title="标题" v-model="show">
      <van-address-edit  :area-list="areaList"  show-delete show-set-default show-search-result
        :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete"
        @change-detail="onChangeDetail" class="content"/>
    </van-action-sheet>

  </div>
</template>

<script>
import { areaList } from '@vant/area-data'
import { Toast } from 'vant'
import { getaddress } from '@/api/address'
export default {
  name: 'addressPage',
  data () {
    return {
      chosenAddressId: '1',
      addresslist: [],
      show: false,
      areaList,
      searchResult: []
    }
  },
  created () {
    this.getAddressList()
  },
  methods: {
    onAdd () {
      Toast('新增地址')
      this.show = true
    },
    onEdit (item, index) {
      Toast('编辑地址:' + index)
      this.show = true
    },
    longAddress (region) {
      return region.province + region.city + region.region
    },
    async getAddressList () {
      const { data: { list } } = await getaddress()
      console.log(list)
      this.addresslist = list.map(item => {
        return {
          id: item.id,
          name: item.name,
          tel: item.phone,
          address: this.longAddress(item.region) + item.detail
        }
      })
    },
    onSave () {
      Toast('save')
    },
    onDelete () {
      Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    }

  }
}
</script>

<style>
 .content {
    padding: 16px 16px 160px;
  }</style>
