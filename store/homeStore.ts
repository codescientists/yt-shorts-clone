import create from 'zustand'
import {persist} from 'zustand/middleware'

import axios from 'axios'

const homeStore = (set:any) =>({
    navOpen:false,

    toggleNavbar: (toggle: Boolean) => set({navOpen: !toggle}),
})


const useHomeStore = create(
    persist(homeStore, {
        name:'home'
    })
)

export default useHomeStore;