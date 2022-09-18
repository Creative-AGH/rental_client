
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'

import { set } from './slice'
import styles from './index.module.scss'

interface ThemePropsT {
    className: string
}

interface themeStateT {
    theme: string
}

const Theme = ({ className }: ThemePropsT) => {
    const theme = useSelector((state: themeStateT) => state.theme)
    const dispatch = useDispatch()

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        dispatch(set(next))
    }

    return (
        <div
            className={cn(
                className,
                styles.root,
                theme === 'dark' ? styles.dark : styles.light)}
            onClick={handleChange}
        />
    )
}

export default Theme