import React, {useState} from 'react';

const Search = () => {
    const [value, setValue] = useState("")
    const [list, setList] = useState([])

    const handleInputChange = event =>{
        setValue(event.target.value)
        console.log(event.target.value)
        const text = event.target.value
        fetch(`http://127.0.0.1:3001/devices/search?text=${text}`,{
            method:"GET"
        })
            .then(res =>{
                if(res.ok){
                    return res.json()
                }
            })
            .then(data =>{
                console.log(data)
            })

    }

    return(
        <div>
            <input
                type={"search"}
                onChange={handleInputChange}
                value={value}
            />
        </div>
    )
};

export default Search