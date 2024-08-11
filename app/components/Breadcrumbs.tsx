// 'use client'
// import React, { ReactNode } from 'react'
// import styles from '../styles/Breadcrumbs.module.scss'
// import { usePathname } from 'next/navigation'
// import Link from 'next/link'

// type TBreadCrumbProps = {
//     homeElement: ReactNode,
//     separator: ReactNode,
//     containerClasses?: string,
//     listClasses?: string,
//     activeClasses?: string,
//     capitalizeLinks?: boolean
// }

// const formatIdWithDashes = (id: string, chunkSize: number = 4): string => {
//     return id.match(new RegExp(`.{1,${chunkSize}}`, 'g'))?.join('-') || id;
// };

// const NextBreadcrumb = ({ homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks }: TBreadCrumbProps) => {

//     const paths = usePathname()
//     const pathNames = paths.split('/').filter(path => path)

//     return (
//         <div>
//             <ul className={`${containerClasses} ${styles.main} pt-32 md:pt-24 px-0 flex flex-wrap w-full md:px-10 lg:px-20`} >
//                 <li className={listClasses}><Link href={'/'}>{homeElement}</Link></li>
//                 {pathNames.length > 0 && separator}
//                 {
//                     pathNames.map((link, index) => {
//                         let href = `/${pathNames.slice(0, index + 1).join('/')}`
//                         let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
//                         let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
//                         return (
//                             <React.Fragment key={index}>
//                                 <li className={itemClasses} >
//                                     <Link href={href}>{itemLink}</Link>
//                                 </li>
//                                 {pathNames.length !== index + 1 && separator}
//                             </React.Fragment>
//                         )
//                     })
//                 }
//             </ul>
//         </div>
//     )
// }

// export default NextBreadcrumb


import React, { ReactNode } from 'react'
import styles from '../styles/Breadcrumbs.module.scss'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type TBreadCrumbProps = {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean,
    idToNameMap?: Record<string, string> // Optional mapping from IDs to names
}

const formatIdWithDashes = (id: string, chunkSize: number = 4, maxChunks: number = 1): string => {
    const formattedId = id.match(new RegExp(`.{1,${chunkSize}}`, 'g'))?.join('-') || id;
    const chunks = formattedId.split('-').slice(0, maxChunks);
    return chunks.join('-');
};

const isId = (segment: string) => {
    // Define the pattern for an ID if needed (e.g., alphanumeric string)
    return /^[a-zA-Z0-9]{20,}$/.test(segment);
}

const NextBreadcrumb = ({ homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks, idToNameMap }: TBreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    const getNameFromId = (id: string) => {
        return idToNameMap?.[id] || (isId(id) ? formatIdWithDashes(id) : id);
    }

    return (
        <div>
            <ul className={`${containerClasses} ${styles.main} pt-32 md:pt-24 px-0 flex flex-wrap w-full md:px-10 lg:px-20`} >
                <li className={listClasses}><Link href={'/'}>{homeElement}</Link></li>
                {pathNames.length > 0 && separator}
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                        let itemLink = capitalizeLinks ? getNameFromId(link)[0].toUpperCase() + getNameFromId(link).slice(1) : getNameFromId(link)
                        return (
                            <React.Fragment key={index}>
                                <li className={itemClasses} >
                                    <Link href={href}>{itemLink}</Link>
                                </li>
                                {pathNames.length !== index + 1 && separator}
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default NextBreadcrumb
