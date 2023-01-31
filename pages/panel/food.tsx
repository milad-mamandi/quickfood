import { FC, useEffect, useState } from 'react'
import styles from '../../styles/FoodPanel.module.css'

interface dataType {
    menus: Array<{
        id: string,
        name: string,
        storeId: string,
        foods: Array<{
            id: string,
            picture: boolean,
            name: string,
            ingredient: string,
            price: number,
            menuId: string
        }>
    }>
}
const dataInit = {
    menus: [{
        id: '', name: '', storeId: '',
        foods: [
            {
                id: '',
                picture: false,
                name: '',
                ingredient: '',
                price: 0,
                menuId: ''
            }]
    }
    ]
}

const Food: FC<{ id: string }> = (props) => {
    const [data, setData] = useState<dataType>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/panel/food?id=' + props.id, { method: 'GET' })
            .then(res => res.json())
            .then(payload => setData(payload.data))
            .then(() => setLoading(false))
    }, [])
    console.log(data);

    return (
        <div className={styles.container_food}>
            {!isLoading && data?.menus.map((menu, k) => {
                return (
                    <div className={styles.menu_row} key={k}>
                        <div className={styles.menu_row_name}>{menu.name}</div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            {menu.foods.map((food, k) => {
                                return (
                                    <tr>
                                        <td>{food.name}</td>
                                        <td>{food.price}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                )
            })}
        </div>
    )
}

export default Food