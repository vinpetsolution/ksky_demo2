"use client"
import { Button } from '../ui/Button'
import { useModal } from '@/contexts/ModalContext'

const Footer = () => {
    const { openProtectedModal } = useModal()

    return (
        <footer className='mt-auto pt-15 pb-7.5 bg-linear-to-b from-black to-[#111] text-[#ccc] border-t-2 border-[#ffd700]'>
            <div className="max-w-5xl mx-auto px-4 md:px-5">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-left md:text-center">

                    <div className="space-y-4 md:space-y-3">
                        <h4 className='text-[#ffd700] text-xl font-bold'>보노보노 카지노</h4>
                        <p className="text-sm leading-relaxed text-[#aaa]"> 최고의 온라인 카지노 경험을 제공합니다. 안전하고 공정한 게임 환경을 약속드립니다.</p>
                    </div>

                    <div className='space-y-3 hidden md:block'>
                        <h4 className='text-[#ffd700] text-base font-semibold'>메뉴</h4>
                        <ul className='space-y-2'>
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("casino")}
                                >
                                    카지노
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("slot")}
                                >
                                    슬롯
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("notice")}
                                >
                                    공지사항
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("bethistory")}
                                >
                                    베팅내역
                                </Button>
                            </li>
                        </ul>
                    </div>

                    <div className='space-y-3 hidden md:block'>
                        <h4 className='text-[#ffd700] text-base font-semibold'>고객지원</h4>
                        <ul className='space-y-2'>
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("deposit")}
                                >
                                    입금
                                </Button>
                            </li>
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("withdraw")}
                                >
                                    출금
                                </Button>
                            </li>
                            {/* 고객센터 - hidden by request, uncomment to re-enable
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("support")}
                                >
                                    고객센터
                                </Button>
                            </li>
                            */}
                            <li>
                                <Button
                                    variant='transparent'
                                    className='text-sm h-auto! p-0! text-[#aaa] hover:text-[#ffd700] hover:translate-x-1 transition-all duration-300'
                                    onClick={() => openProtectedModal("messages")}
                                >
                                    이용안내
                                </Button>
                            </li>
                        </ul>
                    </div>

                    {/* FOLLOW US - Hidden
                    <div className='space-y-3 hidden md:block'>
                        <h4 className='text-[#ffd700] text-base font-semibold'>FOLLOW US</h4>
                        <div className='flex gap-2.5 flex-wrap'>
                            <Link href="/"
                                className={cn("bg-[#222] shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-[#ffd700] hover:text-[#222] hover:bg-[#ffd700] transition-all duration-300",
                                    "hover:translate-y-[-2px]"
                                )}
                            >
                                f
                            </Link>
                            <Link href="/"
                                className={cn("bg-[#222] shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-[#ffd700] hover:text-[#222] hover:bg-[#ffd700] transition-all duration-300",
                                    "hover:translate-y-[-2px]"
                                )}
                            >
                                t
                            </Link>
                            <Link href="/"
                                className={cn("bg-[#222] shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-[#ffd700] hover:text-[#222] hover:bg-[#ffd700] transition-all duration-300",
                                    "hover:translate-y-[-2px]"
                                )}
                            >
                                t
                            </Link>
                            <Link href="/"
                                className={cn("bg-[#222] shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-[#ffd700] hover:text-[#222] hover:bg-[#ffd700] transition-all duration-300",
                                    "hover:translate-y-[-2px]"
                                )}
                            >
                                y
                            </Link>
                        </div>
                    </div>
                    */}
                </div>
                {/* Divider */}
                <div className="my-7 h-px w-full bg-[#ffd7004d]" />
                <p className="text-center text-[13px] text-[#888]">© 2026 KSKY SOLUTION. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer