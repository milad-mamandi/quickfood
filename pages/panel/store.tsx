import { FC, useReducer, useState } from 'react'
import styles from '../../styles/StorePanel.module.css'
import Image from 'next/image'
import { AiFillPicture } from 'react-icons/ai'
import PanelInput from '../../components/UI/PanelInput'
import { toast } from 'react-hot-toast'

interface propsType {
    data: {
        id: string,
        name: string,
        address: string,
        delivery_fee: number,
        open_time: string,
        rating: number
    }
}

const formInit = {
    name: '',
    address: '',
    df: ''
}

const formReducer = (state: { name: string, address: string, df: string }, action: { type: string, payload: string }) => {
    switch (action.type) {
        case 'name':
            return { ...state, name: action.payload }
        case 'address':
            return { ...state, address: action.payload }
        case 'df':
            return { ...state, df: action.payload }
        default:
            throw Error('Unknown action.');
    }
}

const StorePanel: FC<propsType> = (props) => {
    const [selectedFile, setSelectedFile] = useState<File>()
    const [selectedImage, setSelectedImage] = useState('')

    const [data, dispatchData] = useReducer(formReducer, formInit)

    const handleStore = () => {
        const formData = new FormData()
        formData.append('storeID', props.data.id)
        if (selectedFile)
            formData.append('storeImage', selectedFile)
        formData.append('storeName', data.name || props.data.name)
        formData.append('storeAddress', data.address || props.data.address)
        formData.append('storeDF', data.df || props.data.delivery_fee.toString())
        fetch('/api/panel/store', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => {if (data.done === 'ok') toast.success('Successful')})
    }

    return (
        <div className={styles.container_store}>
            <div className={styles.store_picture}>
                <Image src={selectedImage === '' ? ('/images/store/' + props.data.id + '.jpg') : selectedImage} alt='store picture' width={600} height={250} style={{ objectFit: 'cover' }} />
                <input type='file' id='inputImage' accept='image/jpeg' onChange={({ target }) => {
                    if (target.files) {
                        setSelectedImage(URL.createObjectURL(target.files[0]))
                        setSelectedFile(target.files[0])
                    }
                }} />
                <label htmlFor='inputImage' className={styles.overlay}>
                    <AiFillPicture />
                </label>
            </div>
            <div className={styles.store_inputs}>
                <div className={styles.store_inputrow}>
                    <label>Name</label>
                    <PanelInput name='name' type="text" value={props.data.name} icon={0} onChange={dispatchData} />
                </div>
                <div className={styles.store_inputrow}>
                    <label>Address</label>
                    <PanelInput name='address' type="text" value={props.data.address} icon={1} onChange={dispatchData} />
                </div>
                <div className={styles.store_inputrow}>
                    <label>Delivery Fee</label>
                    <PanelInput name='df' type="number" value={props.data.delivery_fee.toString() + '$'} icon={2} onChange={dispatchData} />
                </div>
            </div>
            <button className={styles.button_apply} onClick={handleStore}>Apply</button>
        </div>
    )
}

export default StorePanel