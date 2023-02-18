import React from "react";
import { addDoc,collection } from "firebase/firestore";
import { db } from "./config";
import { iloc } from "../component/type";

export function addDataTool(ref:string,data:any) {
    addDoc(collection(db,ref),data)
    .then(docRef => {
        console.log("Document has been added successfully");
    })
    .catch(error => {
        console.log(error);
    })
}