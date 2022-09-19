
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'

import { set } from './slice'
import styles from './index.module.scss'

const Theme = ({ className }: string) => {
    const theme = useSelector(state => state.theme)
    const dispatch = useDispatch()

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleChange = () => {
        const next = theme === 'dak' ? 'light' : 'dark'
        dispatch(set(next))
    }

    return (

  )
}

export default Theme