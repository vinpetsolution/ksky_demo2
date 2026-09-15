"use client"
import { cn } from '@/utils/classNames'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { useModal } from "@/contexts/ModalContext"
import { useAuth } from "@/contexts/AuthContext"
import { LuCoins, LuLogOut, LuMenu, LuUser, LuWallet, LuX } from 'react-icons/lu'
import { TbReload } from 'react-icons/tb'
import { useState, useCallback } from 'react'
import { formatNumber } from '@/utils/format'

const Header = () => {
  const { openProtectedModal, openModal, isAuthenticated } = useModal()
  const { user, logout, refreshUserProfile } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleLogout = useCallback(() => {
    logout()
    setIsOpen(false)
  }, [logout])

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return
    setIsRefreshing(true)
    try {
      await refreshUserProfile()
    } finally {
      setIsRefreshing(false)
    }
  }, [isRefreshing, refreshUserProfile])
  return (
    <header className={cn("lg:sticky top-0 z-50",
      "bg-linear-to-b from-[#141023fa] to-[#080a18fa] border-b border-[#ffb74d2e]",
      "shadow-[0px_8px_24px_#00000059,inset_0_1px_#ffffff0a] w-full lg:min-h-18.5",
      "fixed left-0 right-0 top-0 min-h-17.5"
    )}>
      <nav className="px-4 md:px-6 py-2.5 lg:px-6 max-w-7xl mx-auto gap-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center justify-center h-full"
        >
          <Image src="/images/logo/ksky.png"
            alt="KSKY"
            width={200}
            height={200}
            className="h-12.5 object-center w-auto"
          />
        </Link>

        <div className={cn("hidden flex-1 lg:flex items-center justify-end gap-4")}>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("casino")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              카지노
            </Button>
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("slot")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              슬롯
            </Button>
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("deposit")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              입금
            </Button>
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("withdraw")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              출금
            </Button>
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("notice")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              공지사항
            </Button>
            {/* 고객센터 - hidden by request, uncomment to re-enable
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("support")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              고객센터
            </Button>
            */}
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("messages")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              쪽지함
            </Button>
            <Button
              type="button"
              variant="transparent"
              onClick={() => openProtectedModal("bethistory")}
              className="text-[0.95rem] h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
            >
              베팅내역
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <>
                <div className='flex items-center gap-1 text-[#f4d693] text-xs'>
                  <LuWallet className='size-3.5 shrink-0' />
                  <span>{formatNumber(user.balanceMoney)}원</span>
                  <Button
                    variant='transparent'
                    className='p-1 h-auto! rounded-md border border-yellow-500/25 bg-yellow-500/10 text-[#f4d693] hover:text-white'
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                  >
                    <TbReload className={cn('size-3.5', isRefreshing && 'animate-spin')} />
                  </Button>
                </div>
                <div className='flex items-center gap-1 text-[#f4d693] text-xs'>
                  <LuCoins className='size-3.5 shrink-0' />
                  <span>{formatNumber(user.balancePoint)}P</span>
                </div>
                <Button
                  variant='secondary'
                  className='h-9 rounded-xl text-xs font-bold'
                  onClick={() => openProtectedModal("convert")}
                >
                  전환
                </Button>
                <div className='flex items-center gap-1 text-[#f4d693] text-xs'>
                  <LuUser className='size-3.5 shrink-0' />
                  <span>{user.userName}</span>
                </div>
                <Button
                  variant='secondary'
                  className='h-9 rounded-xl text-xs font-bold'
                  onClick={() => openProtectedModal("mypage")}
                >
                  마이페이지
                </Button>
                <Button
                  variant='secondary'
                  className='h-9 rounded-xl text-xs font-bold'
                  leftIcon={<LuLogOut className='size-3.5 shrink-0' />}
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => openModal("login")}
                  className="px-3 rounded-xl font-bold"
                >
                  로그인
                </Button>
                <Button
                  type="button"
                  onClick={() => openModal("register")}
                  className="rounded-[14px] px-3 font-bold"
                >
                  회원가입
                </Button>
              </>
            )}
          </div>
        </div>
        <div className='lg:hidden flex items-center gap-2'>
          {!isAuthenticated && (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => openModal("login")}
                className="px-3.5 rounded-[14px] py-2.5 h-auto! font-bold text-xs"
              >
                로그인
              </Button>
              <Button
                type="button"
                onClick={() => openModal("register")}
                className="rounded-[14px] px-3.5 py-2.5 h-auto! font-bold text-xs"
              >
                회원가입
              </Button>
            </>
          )}
          <Button variant='transparent' className='text-[#f4d693] h-auto p-0'
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <LuX className='size-6' /> : <LuMenu className='size-6' />}
          </Button>
        </div>
      </nav>
      {isOpen && (
        <div className='lg:hidden border-t border-yellow-500/25 bg-[#0d0d0d]/95'>
          <div className='mx-auto max-w-7xl px-4 md:px-6 py-3 text-left'>
            <div className='grid gap-1'>
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("casino"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                카지노
              </Button>
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("slot"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                슬롯
              </Button>
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("deposit"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                입금
              </Button>
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("withdraw"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                출금
              </Button>
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("notice"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                공지사항
              </Button>
              {/* 고객센터 - hidden by request, uncomment to re-enable
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("support"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                고객센터
              </Button>
              */}
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("messages"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                쪽지함
              </Button>
              <Button
                type="button"
                variant="transparent"
                onClick={() => { openProtectedModal("bethistory"); setIsOpen(false) }}
                className="text-[0.95rem] justify-start h-auto! font-bold py-2.5 px-3 rounded-xl whitespace-nowrap  text-[#f3d498] hover:text-[#fff2cc] hover:bg-[#ffb84d1f]"
              >
                베팅내역
              </Button>
            </div>
            <div className='mt-3 border-t border-yellow-500/20 pt-3'>
              {isAuthenticated && user ? (
                <>
                  <div className='space-y-2 text-sm text-[#f4d693]'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <LuWallet className='size-3.5 md:size-4' />
                        <span>보유머니</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span>{formatNumber(user.balanceMoney)}원</span>
                        <Button
                          variant='transparent'
                          className='p-1 h-auto! rounded-md border border-yellow-500/25 bg-yellow-500/10 text-[#f4d693] hover:text-white'
                          onClick={handleRefresh}
                          disabled={isRefreshing}
                        >
                          <TbReload className={cn('size-3.5 md:size-4', isRefreshing && 'animate-spin')} />
                        </Button>
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <LuUser className='size-3.5 md:size-4' />
                        <span>회원</span>
                      </div>
                      <span>{user.userName}</span>
                    </div>
                  </div>
                  <div className='mt-2 flex gap-2'>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => { openProtectedModal("mypage"); setIsOpen(false) }}
                      className="w-full rounded-xl font-bold"
                    >
                      마이페이지
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => { openProtectedModal("convert"); setIsOpen(false) }}
                      className="w-full rounded-xl font-bold"
                    >
                      전환
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleLogout}
                      className="w-full rounded-xl font-bold"
                    >
                      로그아웃
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex gap-2'>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => { openModal("login"); setIsOpen(false) }}
                      className="w-full rounded-xl font-bold"
                    >
                      로그인
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => { openModal("register"); setIsOpen(false) }}
                      className="w-full rounded-xl font-bold"
                    >
                      회원가입
                    </Button>
                  </div>
                </>
              )}

            </div>

          </div>
        </div>
      )}
    </header>
  )
}

export default Header