import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { ItemCount } from '../ItemCount/ItemCount'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'

export const ItemDetail = ({id, name, img, desc, price, stock}) => {

    const {agregarAlCarrito, isInCart} = useContext(CartContext)

    const navigate = useNavigate()

    const [cantidad, setCantidad] = useState(0)

    const handleVolver = () => {
        navigate(-1)
    }
    const handleVolverInicio = () => {
        navigate('/')
    }
    const handleAgregar = () => {
        if (cantidad > 0) {
            agregarAlCarrito({
                id,
                name,
                price,
                img,
                cantidad
            })
        }
    }

    return (
        <div>
            <h2>{name}</h2>
            <img src={img} alt={name}/>
            <p>{desc}</p>
            <p>Precio: ${price}</p>

            {
                !isInCart(id)
                ? <ItemCount
                    max={stock}
                    cantidad={cantidad}
                    setCantidad={setCantidad}
                    onAdd={handleAgregar}
                    />
                : <Link to="/cart" className="btn btn-success d-block">Terminar mi compra</Link>
            }

            <button className="btn btn-primary" onClick={handleVolver}>Volver</button>
            <button className="btn btn-primary" onClick={handleVolverInicio}>Volver al Inicio</button>
        </div>
    )
}
