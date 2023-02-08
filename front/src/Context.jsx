import { useState } from 'react';
function Context() {
    const [id, setId]=useState('')
    const[username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [resumeList, setResumeList]=useState([])
    const [editdoc, setEditDoc]=useState([])
    const [productList, setProductList]=useState([])
    return {
        id, setId, email, setEmail, setResumeList,resumeList,setEditDoc,editdoc, productList, setProductList,username, setUsername
    };
}

export default Context;