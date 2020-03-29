const validate = (message: any) => {
    if((message.type) && (message.payload)){
        true
    }
    return false;
}

export default validate;