import React from 'react'
import axios from 'axios'
import { async } from '@firebase/util'

const aseUrl = 'https://thaiaddressapi-thaikub.herokuapp.com'

export async function getProvince() {
    await axios.get(`${aseUrl}/v1/thailand/provinces`)
}

