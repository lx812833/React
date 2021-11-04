import React, { useState } from "react";
import { Content, LeftMenu, NavList } from "./layout";
import "./index.scss";

export const RotatingNavigation: React.FC = (props) => {
  const navList = [
    {
      url: "http://www.eveningwater.com/",
      text: "个人网页"
    },
    {
      url: "https://www.eveningwater.com/my-web-projects/",
      text: "我的项目"
    },
    {
      url: "http://github.com/eveningwater",
      text: "github"
    }
  ];
  const contentData = [
    "初起，观天，当中云暗，忽觉已而须有雨下。果未其然，须臾，雨翻盆而至，林中道上，从漉漉更浥浥。闻其声，似万马奔腾而至，有波涛汹汹之势，有浪雪滚滚之势，始惊。",
    "当是时也，道上成河，林中为汤，屋舍渗露，土地溜泥。天上旭旭，下潾潾，白云连天，清珠连道。阡陌芳草，惟以新得乳洗，即林林使人不尽心观矣。山嶙嶙，树葱葱，花艳艳，叶青青，而亦浅浅，是以万物之处无一不见淋。上危楼，观尽天下，阵阵风狂啸而至，道更浏耳！看风何其狂，雨何其暴矣！旖旎之木，岿然之山，澹澹之水，似有意迎之。故以为天下之美，莫过于乃尔！欸哉！欸哉！",
    '<img src="https://img1.baidu.com/it/u=1715892567,1596615060&fm=26&fmt=auto" alt="图片加载中">',
    "已而，雨自急迁淅沥，万物却依旧浥。雨纷纷似雪落，花于地。乃吾知之念非矣。固以为雨且狂一时，乃吾观之。以为闻其声而知其物，看其物而识其形，雨亦乃尔，惑矣。吾即闻声，却亦知物，而吾看物，不可知形也，何其哀矣。其缘吾之不胜书邪？其缘吾之望所失邪？非也。吾岂不读书邪？亦不是也。盖书不可不读耳！一日不读，书不知何用矣。吾必爱书，吾之所以爱书，惟缘吾以为爱书者，必爱学也，方可成事。书之不爱，学且何爱，事且成乎？",
    "雨终时，道已忽忽有漉矣，日从东方出，云失暗，而更白，是以吾知晴方至，天渐明，地渐清，恍若地洒于天。于是吾踏积露而去，见叶如新，树亦焕然，可知天非无情矣。何则天地无情，无情何在？草木飘零，芬芳枯损，自然之理也。孰谓之无情焉？其雨狂而无情邪？其风暴而无情邪？皆不是也。夫天地之无情，由人而生，人若无情，天且有情邪？",
    "朝雨之事，使吾有所得。吾知天非无情，无情于己欤。吾亦知须爱书，爱书必读之，使吾之观开也。故作文以抒怀，九月四日记。"
  ];

  const [status, setStatus] = useState("");
  const changeMenu = (type: string) => {
    setStatus((type === "close" ? "" : "show-nav"));
  }

  return (
    <div className="page-wrapper">
      <div className={`page-container ${status}`}>
        <LeftMenu changeIcon={changeMenu}></LeftMenu>
        <Content>
          <h1>朝闻雨记</h1>
          <small>--夕水(2013年9月4日作)</small>
          {/* 
            dangerouslySetInnerHTML：
              React提供的属性，这个属性的属性值是一个以__html作为属性，
              值是html字符串的对象，就可以将html字符串渲染成真实的DOM元素 
          */}
          {
            contentData.map((item, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: item }}></p>
            ))
          }
        </Content>
      </div>
      <NavList navList={navList}></NavList>
    </div>
  )
}