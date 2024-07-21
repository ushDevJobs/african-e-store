import React, { useState } from 'react'
import { DraftResponse } from '../components/models/ISellerStore'
import { DeleteIcon, EditIcon } from '../components/SVGs/SVGicons'
import Image from 'next/image'
import { FullPageLoader } from '../Loader/ComponentLoader'

type Props = {
    isDeletingId: string | null
    handleRemoveProduct: (id: string) => Promise<void>
    drafts: DraftResponse[] | undefined
    isFetchingDrafts: boolean
}

const DraftSection = ({
    isDeletingId,
    handleRemoveProduct,
    drafts,
    isFetchingDrafts
}: Props) => {

    return (
        <main className="w-full">
            <div className="flex flex-col gap-10">
                {drafts?.map((draft) => (
                    <div className="flex gap-4" key={draft.id}>
                        <div className="relative h-[174px] min-w-[221px]">
                            {draft.coverImage &&
                                <Image
                                    src={draft.coverImage}
                                    alt="product image"
                                    fill
                                    className="object-cover rounded-[22px]"
                                />
                            }
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-[#828282] text-lg">{draft.name}</h2>
                            <p className="text-[#1E1E1E] text-sm mb-1">{draft.details}</p>
                            <h3 className="font-medium text-base text-[#1E1E1E] mb-14">
                                &pound;{draft.amount.toLocaleString()}
                            </h3>
                            <div className="flex items-center gap-4">
                                <button className="border flex items-center justify-center cursor-pointer gap-1 border-[#2C7865] text-[#2C7865] rounded-[37px] py-3 px-14">
                                    <EditIcon /> Edit
                                </button>
                                <button
                                    key={draft.id}
                                    type="button"
                                    onClick={() => handleRemoveProduct(draft.id)}
                                    disabled={isDeletingId !== null}
                                    className="border flex items-center justify-center cursor-pointer gap-1 border-[#FD6A02] text-[#FD6A02] rounded-[37px] py-3 px-14 disabled:pointer-events-none disabled:opacity-60"
                                >
                                    <DeleteIcon /> {isDeletingId === draft.id ? "Deleting..." : "Remove"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {!drafts && isFetchingDrafts && (
                <FullPageLoader />
            )}
            {!drafts || drafts.length === 0 && (
                <p className='h-52 w-full grid place-items-center text-[#333333]'>No item in your draft </p>
            )}
        </main>
    )
}

export default DraftSection