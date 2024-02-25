import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AB_COMMENT } from '@/components/my-const_forum';



import Link from 'next/link';

import styles from "@/css/forum/[article_id].module.css";
import dayjs from 'dayjs';



// icon
import { BsActivity } from "react-icons/bs";
import { BsArchiveFill } from "react-icons/bs";
import { BsCupHotFill } from "react-icons/bs";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { BsFileEarmarkMusicFill } from "react-icons/bs";

// icon

// 會員名字
import AuthContext from '@/components/contexts/AuthContext'
import { useContext } from 'react'
// 會員名字




export default function ABEdit() {
  const [myForm, setMyForm]= useState({
    article_id:"",
    article_member_id:"",
    article_boardcategory_name:"",
    article_title_name:"",
    article_content:"",
    article_release_date:"",
    article_update_date:"",
    article_like_num:"",
    article_comment_num:"",
    pic:"",
  });


    const router= useRouter();
    useEffect(()=>{

    const article_id = +router.query.article_id;
    console.log({article_id, raw: router.query.article_id});

    //有抓到值時
    if(router.query.article_id !== undefined){
      // console.log(router.query.article_id,article_id);
      if(!article_id){
        router.push("/address-book");
      }else {
        fetch(AB_COMMENT + "/" + article_id)
        .then(r=>r.json())
        .then(data=>{
          // console.log('eddie',data);
            if(! data.success){
              router.push("/address-book"); //沒拿到資料就跳回列表頁

            }else{
              setMyForm({...data.row});
            }
        })
        .catch(ex=>console.log(ex))
      }

    }


    },[router.query.article_id]);








    const [displayInfo, setDisplayInfo] =useState("");

// 彈出來的視窗



    // const changeHandler =(e) =>{

    //     const { name, id, value} =e.target;
    //     // console.log({name, id, value});
    //     setDisplayInfo("");
    //     setMyForm({...myForm, [id]: value});
    // };

    // const onSubmit = async (e)=>{
    //   e.preventDefault();

    //   const r = await fetch(AB_COMMENT + "/" + myForm.article_id, {
    //     method: "PUT",
    //     body: JSON.stringify(myForm),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   const responseData= await r.json();
    //   // responseDate就會拿到資料~
    //   if(responseData.success){
    //     setDisplayInfo("succ");
    //     alert("修改成功了唷!!!!!")
    //   }else{
    //     setDisplayInfo("fail");

    //     alert('沒辦法讓你送出，但是你卻成功了??好啦你很棒')
    //   }
    // };



//會員名字
const { auther } = useContext(AuthContext)
//會員名字














const [data, setData]=useState({});








    return (
      <>


<div className={styles.main}>


{/* 左邊欄位 */}
<div className={styles.leftList}>
               <div className={styles.memberPicOut}>
                  <img className={styles.memberPic} src='/images/forum/member01.jpg'></img>
               </div> 

              <div className={styles.memberItems}>
                  <br></br>
                <div className={styles.name}>
                




{/* 會員名稱 */}
{auther.account ? (
              <>
                <div className={styles.headerRightIcon}>
                  <span>{auther.account}</span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.headerRightIcon}>
                  <Link
                    style={{ color: 'white', textDecoration: 'none' }}
                    href="/member/login"
                  >
                    登入
                  </Link>
                </div>
              </>
            )}                
 {/* 會員名稱 */}
               
                
                
                
                
                
                </div>
                {/* <br></br>
                <div className={styles.name}>memberNameInEng</div> */}
                <br></br>  
                <div className={styles.nowLocationOut}>
                   <div className={styles.nowLocation}>最新文章</div> 
                </div> 
              </div>  

            <div className={styles.iconsOut}>
              <div className={styles.icons}>
                <br></br>
                <div className={styles.icon}><BsActivity              className={styles.iconSick}/><a className={styles.iconLink} href='#'> 毛孩小毛病</a></div>
                <div className={styles.icon}><BsArchiveFill           className={styles.iconSick}/><a className={styles.iconLink} href='#'> 好用家用品</a></div>

                <div className={styles.icon}><BsCupHotFill            className={styles.iconSick}/><a className={styles.iconLink} href='#'> 時髦貓食</a></div>

                <div className={styles.icon}><BsPencilFill            className={styles.iconSick}/> <div className={styles.iconLink}><Link className={styles.iconLink} href={`/forum/create`}>創作文章</Link></div> 
                </div>

                <div className={styles.icon}><BsFileEarmarkMusicFill  className={styles.iconSick}/> <div className={styles.iconLink}><Link className={styles.iconLink} href={`/forum/creation`}>我的文章</Link></div> 
                </div>


                <div className={styles.icon}><BsFillBookmarkHeartFill  className={styles.iconSick}/> <div className={styles.iconLink}><Link className={styles.iconLink} href={`/forum/collection`}>我的收藏</Link></div> 
                </div>


              </div>
            </div>

          </div>
{/* 左邊欄位 */}






















        {/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}
        <div className={styles.article}>
            <div className={styles.articleCard}>
              <h1>{myForm.article_title_name}</h1>
              <div className={styles.articleCardWrAndTime}>
                <div className={styles.articleCategory}>{myForm.article_boardcategory_name}</div>
                <div className={styles.articleCardWriter}>{myForm.article_member_name}</div>
                <div className={styles.articleCardTime}>{ dayjs(myForm.article_release_date).format('YYYY-MM-DD  HH:mm') }</div>
              </div>

              <div className={styles.articleCardContent}>
              {myForm.article_content}
              </div>
              <img className={styles.articleContentPic} src={`/images/forum/articleContent/${myForm.pic}.webp`}></img>
              {/* <div>{console.log(myForm,'22')}</div>
              <div>{console.log(typeof(myForm))}</div>
              <div>{console.log(myForm.pic)}</div> */}


{/* 文章的按讚 分享 收藏   */}
              <div className={styles.articleCardLCS}>
                <img className={styles.like} src='/images/forum/like.svg'></img>
                <div>{myForm.article_like_num}</div>
                <img className={styles.chat} src='/images/forum/chat.svg'></img>


{/* 正確的留言數字是要另外寫的! */}
                {/* <div>{data.count}</div> */}
{/* 正確的留言數字是要另外寫的! */}

                <img className={styles.save} src='/images/forum/save.svg'></img>
                <div>收藏</div>
              </div>
 {/* 文章的按讚 分享 收藏   */}
            

        </div>
        {/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}{/* 文章 */}







{/* 留言們 */}{/* 留言們 */}{/* 留言們 */}{/* 留言們 */}{/* 留言們 */}




{/* 留言 */}{/* 留言 */}{/* 留言 */}{/* 留言 */}{/* 留言 */}

<div className="row">
          <div className="col">
              { data.rows2 && data.rows2.map((i)=>{

                return(
                  <>

                    <div key={i.article_id} >

                    
                      <div >
                        <div>{ i.comment_content }</div>
                      </div>
                      

                    </div>
                </>
                );})}

    </div>
</div>



{/* 輸入留言 */}{/* 輸入留言 */}{/* 輸入留言 */}

{/* <CreateComment></CreateComment> */}
{/* <CreateComment article_id={myForm.article_id} /> */}

{/* 輸入留言 */}{/* 輸入留言 */}{/* 輸入留言 */}



{/* 留言 */}{/* 留言 */}{/* 留言 */}{/* 留言 */}{/* 留言 */}







{/* 留言們 */}{/* 留言們 */}{/* 留言們 */}{/* 留言們 */}{/* 留言們 */}




        </div>





      </div>



      </>
      
      
      
      
      
      
      );

}
