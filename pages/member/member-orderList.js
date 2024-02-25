import { useState, useEffect, useContext } from 'react'
import AuthContext from '@/components/contexts/AuthContext'
import Link from 'next/link'
import { ORDER_LIST } from '@/components/my-const'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { GET_MEMBER_DATA } from '@/components/my-const'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { BsCart4 } from 'react-icons/bs'
import { BsFillTrophyFill } from 'react-icons/bs'
import { BsBagHeartFill } from 'react-icons/bs'
import styles from '@/css/favorite.module.css'
import Image from 'next/image'
import Router from 'next/router'
import { BsArrowRight } from 'react-icons/bs'

import {
  BsChevronRight,
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsChevronLeft,
} from 'react-icons/bs'
import { ImOpt } from 'react-icons/im'

export default function MemberOrderList() {
  const [data, setData] = useState({})
  const router = useRouter()

  const [mydata, setMydata] = useState({
    sid: '',
    lastname: '',
    firstname: '',
    birthday: '',
    mobile: '',
    account: '',
    password: '',
    zipcode: '',
    address: '',
    identification: '',
    email: '',
    city: '',
    district: '',
  })
  const { auther } = useContext(AuthContext)
  // 去抓後端處理好的單筆資料(顯示在會員中心)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 檢查 localStorage 中是否存在 'auther'，以及 'auther' 是否有有效的 sid
        //如果沒登入就跑到會員中心不會報錯
        const authDataString = localStorage.getItem('auther')
        if (!authDataString) {
          console.log('No "auther" data found.')
          return
        }
        const authData = JSON.parse(authDataString)
        if (!authData || !authData.sid) {
          console.log('No valid "auther" data found.')
          return
        }
        const sid = authData.sid
        console.log('sid', sid)
        const response = await fetch(GET_MEMBER_DATA, {
          body: JSON.stringify({ sid: sid }),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        })
        const memberData = await response.json()

        // 處理生日格式
        if (memberData.birthday) {
          memberData.birthday = dayjs(memberData.birthday).format('YYYY-MM-DD')
        }

        console.log('memberData:', memberData)
        setMydata(memberData)
      } catch (error) {
        console.error('Error fetching mydata:', error)
      }
    }

    // 呼叫 fetchData 以觸發資料載入
    fetchData()
  }, [router.query.sid])

  //取page資料
  const getListData = async () => {
    let page = +router.query.page || 1
    if (page < 1) page = 1
    try {
      const r = await fetch(ORDER_LIST + `?page=${page}`)
      const d = await r.json()
      setData(d)
    } catch (ex) {'eror:'}
  }

  useEffect(() => {
    getListData()
  }, [router.query.page])
  return (
    <>
      <div className="container d-flex">
        {/* 左邊欄位 */}
        <div style={{marginLeft: '100px'}}>
          <div className={styles.leftList}>
            <div className={styles.memberPicOut}>
              <Image
                alt=""
                src={
                  mydata.photo
                    ? `http://localhost:3002/img/${mydata.photo}`
                    : '/pics/headshot.png'
                }
                className={styles.memberPic}
                width="140"
                height="140"
              ></Image>
            </div>

            <div className={styles.memberItems}>
              <br></br>
              <div className={styles.name}>會員名稱</div>
              <br></br>
              {auther.account ? (
                <>
                  <div className={styles.name}>
                    <span>{auther.account}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.name}>
                    <span style={{ color: 'white' }}></span>User
                  </div>
                </>
              )}
              <br></br>
              <div className={styles.nowLocationOut}>
                <div className={styles.nowLocation}>編輯個人資料</div>
              </div>
            </div>

            <div className={styles.iconsOut}>
              <div className={styles.icons}>
                <br></br>
                <div className={styles.icon}>
                  <BsFillTicketDetailedFill className={styles.iconSick} />
                  <Link className={styles.iconLink} href="/favorite/coupon2">
                    {' '}
                    優惠券管理
                  </Link>
                </div>
                <div className={styles.icon}>
                  <BsCart4 className={styles.iconSick} />
                  <Link
                    className={styles.iconLink}
                    href="/member/member-orderList"
                  >
                    {' '}
                    購物清單
                  </Link>
                </div>
                <div className={styles.icon}>
                  <BsFillTrophyFill className={styles.iconSick} />
                  <Link className={styles.iconLink} href="/favorite/game">
                    {' '}
                    簽到任務
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <h3>購物清單</h3>
          {data.rows &&
            data.rows.map((v, i) => {
              const handleItemClick = () => {
                router.push(`../../cart/${v.oid}`)
              }
              return (
                <form className="my-4" key={v.oid}>
                  <div
                    className="d-flex justify-content-center"
                    role="button"
                    tabIndex={0}
                    onClick={handleItemClick}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        router.push(`../../cart/${v.oid}`)
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="direction-column">
                      <div
                        className="card border-primary"
                        style={{ width: '40rem' }}
                      >
                        <div
                          className="card-header card-big-title border border-0"
                          style={{ backgroundColor: 'transparent ' }}
                        >
                          訂單編號：{v.oid}
                        </div>
                        <div className="card-body">
                          <h5 className="card-title font-grey-title mb-2">
                            訂單成立時間：
                            {dayjs(v.order_date).format('YYYY-MM-DD HH:mm:ss')}
                          </h5>
                          <h5 className="card-title font-grey-title mb-2 ">
                            付款方式：{v.pay_way}
                          </h5>
                          <h5 className="card-title font-grey-title mb-2 text-info">
                            付款情況：
                            {v.order_status === 1
                              ? '已付款'
                              : v.order_status === 0
                              ? '未付款'
                              : ''}
                          </h5>
                          <h5 className="card-title font-grey-title mb-2">
                            交貨方式：{v.delivery_way}
                          </h5>
                          <h5 className="card-title font-grey-title mb-2 text-success">
                            處理情況：{v.delivery_status}
                          </h5>
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title font-grey-title mb-2 text-danger">
                              總金額：NT$ {v.total}
                            </h5>
                            <h5>
                              See more <BsArrowRight />
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )
            })}
          {/* 頁碼 */}
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            className="mb-5"
          >
            <div className="pages mx-auto">
              <div className="row">
                <div className="col">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li>
                        <Link
                          className={`page-link ${
                            data.page === 1 ? 'disabled' : ''
                          }`}
                          href={data.page !== 1 ? `?page=${1}` : '#'}
                          style={{
                            background:
                              data.page === 1 ? 'transparent' : 'transparent',
                            border: 'none',
                            color: data.page === 1 ? '#B0B7C3' : '', // 新增此行
                          }}
                        >
                          <BsChevronDoubleLeft />
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`page-link ${
                            data.page === 1 ? 'disabled' : ''
                          }`}
                          href={`?page=${data.page - 1}`}
                          style={{
                            background:
                              data.page === 1 ? 'transparent' : 'transparent',
                            border: 'none',
                            color: data.page === 1 ? '#B0B7C3' : '', // 新增此行
                          }}
                        >
                          <BsChevronLeft />
                        </Link>
                      </li>
                      {data.success && data.totalPages
                        ? Array(7)
                            .fill(1)
                            .map((v, i) => {
                              const p = data.page - 3 + i
                              if (p < 1 || p > data.totalPages) return null
                              return (
                                <li
                                  key={p}
                                  className={
                                    p === data.page
                                      ? 'page-item active'
                                      : 'page-item'
                                  }
                                  style={{ marginRight: '6px' }}
                                >
                                  <Link
                                    className={`page-link ${
                                      p === data.page ? 'active-link' : ''
                                    }`}
                                    href={'?page=' + p}
                                    style={{
                                      borderRadius: '10px',
                                      border:
                                        p === data.page
                                          ? '1px solid #FFB44F'
                                          : '1px solid ',
                                      backgroundColor:
                                        p === data.page
                                          ? '#f8723f'
                                          : 'transparent', // 新增此行
                                      color: p === data.page ? '#fff' : '',
                                      width: '38px',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {p}
                                  </Link>
                                </li>
                              )
                            })
                        : null}
                      <li>
                        <Link
                          className={`page-link ${
                            data.page === data.totalPages ? 'disabled' : ''
                          }`}
                          href={`?page=${data.page + 1}`}
                          style={{
                            background:
                              data.page === data.totalPages
                                ? 'transparent'
                                : 'transparent',
                            border: 'none',
                            color:
                              data.page === data.totalPages ? '#B0B7C3' : '', // 新增此行
                          }}
                        >
                          <BsChevronRight />
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={`page-link ${
                            data.page === data.totalPages ? 'disabled' : ''
                          }`}
                          href={
                            data.page !== data.totalPages
                              ? `?page=${data.totalPages}`
                              : '#'
                          }
                          style={{
                            background:
                              data.page === data.totalPages
                                ? 'transparent'
                                : 'transparent',
                            border: 'none',
                            color:
                              data.page === data.totalPages ? '#B0B7C3' : '', // 新增此行
                          }}
                        >
                          <BsChevronDoubleRight />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
