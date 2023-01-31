import { FC, useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth-context'
import styles from '../../styles/OrderPanel.module.css'

interface dataType {
    id: string,
    user: { email: string },
    items: Array<{ name: string, price: number }>,
    subtotal: number
}

const Food: FC<{ id: string }> = (props) => {
    const [data, setData] = useState<Array<dataType>>([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('/api/panel/order?id=' + props.id, { method: 'GET' })
            .then(res => res.json())
            .then(payload => setData(payload.data))
            .then(() => setLoading(false))
    }, [])
    console.log(data);

    return (
        <div className={styles.container_food}>
            {!isLoading && data.map((order, k) => {
                return (
                    <div className={styles.order_row} key={k}>
                        <div className={styles.order_tag}>Order #{order.id}</div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Customer's Email</th>
                                    <th>Items</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{order.user.email}</td>
                                <td>{order.items.map((item, k) => {return item.name + ' / '})}</td>
                                <td>{order.subtotal}$</td>
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}

export default Food