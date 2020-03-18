export const testSpace = str => {
	var reg = /\s/g
    return reg.test(str)
}

export const testPhone = str => {
	let reg = /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/;
	return reg.test(str)
}

export const testMobile = str => {
	const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	return reg.test(str)
}

export const testIdCard = str => {
	const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return reg.test(str)
}

export const testIdCardInput = str => {
	const reg = /(\d|X|x)$/;
    return reg.test(str)
}

export const testNumber = str => {
	let reg = /^[0-9]+$/;
	return reg.test(str)
}

export const trim = str => {
    let newstr = str+''
    return newstr.replace(/\s/g,"")
}

export const testNum = str => {
	let reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/;
	var pattern = new RegExp(reg)
	return pattern.test(str)
}

export const getNowFormatDate = () => {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
	  month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
	  strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

export const testBankCard = bankNum => {
	var lastNum=bankNum.substr(bankNum.length-1,1);//取出最后一位（与luhn进行比较）
	
	var first15Num=bankNum.substr(0,bankNum.length-1);//前15或18位
	var newArr=new Array();
	for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
		newArr.push(first15Num.substr(i,1));
	}
	var arrJiShu=new Array();  //奇数位*2的积 <9
	var arrJiShu2=new Array(); //奇数位*2的积 >9

	var arrOuShu=new Array();  //偶数位数组
	for(var j=0;j<newArr.length;j++){
		if((j+1)%2==1){//奇数位
			if(parseInt(newArr[j])*2<9)
				arrJiShu.push(parseInt(newArr[j])*2);
			else
				arrJiShu2.push(parseInt(newArr[j])*2);
		}
		else //偶数位
			arrOuShu.push(newArr[j]);
	}

	var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
	for(var h=0;h<arrJiShu2.length;h++){
		jishu_child1.push(parseInt(arrJiShu2[h])%10);
		jishu_child2.push(parseInt(arrJiShu2[h])/10);
	}        

	var sumJiShu=0; //奇数位*2 < 9 的数组之和
	var sumOuShu=0; //偶数位数组之和
	var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal=0;
	for(var m=0;m<arrJiShu.length;m++){
		sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
	}

	for(var n=0;n<arrOuShu.length;n++){
		sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
	}

	for(var p=0;p<jishu_child1.length;p++){
		sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
		sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
	}      
	//计算总和
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

	//计算luhn值
	var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
	var luhn= 10-k;

	if(lastNum==luhn)return true;
	
	return false
}



var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
    var chnUnitSection = ["","万","亿","万亿","亿亿"];
    var chnUnitChar = ["","十","百","千"];

var numToChn = function(num){
      var index =  num.toString().indexOf(".");
      if(index != -1){
          var str = num.toString().slice(index);
          var a = "点";
              for(var i=1;i<str.length;i++){
                     a += chnNumChar[parseInt(str[i])];
               }
          return a ;
      }else{
          return "";
      }
}

//定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
function sectionToChinese(section){
    var str = '', chnstr = '',zero= false,count=0;   //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
    while(section>0){
         var v = section % 10;  //对数字取余10，得到的数即为个位数
         if(v ==0){                    //如果数字为零，则对字符串进行补零
             if(zero){
                 zero = false;        //如果遇到连续多次取余都是0，那么只需补一个零即可
                 chnstr = chnNumChar[v] + chnstr; 
             }      
         }else{
             zero = true;           //第一次取余之后，如果再次取余为零，则需要补零
             str = chnNumChar[v];
             str += chnUnitChar[count];
             chnstr = str + chnstr;
         }
         count++;
         section = Math.floor(section/10);
    }
    return chnstr;
}



//定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零

export const TransformToChinese = num => {
	 var a = numToChn(num);
	 num = Math.floor(num);
	  var unitPos = 0;
	  var strIns = '', chnStr = '';
	  var needZero = false;
	 
	  if(num === 0){
			return chnNumChar[0];
	  } 
	  while(num > 0){
			var section = num % 10000;
			if(needZero){
			  chnStr = chnNumChar[0] + chnStr;
			}
			strIns = sectionToChinese(section);
			strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
			chnStr = strIns + chnStr;
			needZero = (section < 1000) && (section > 0);
			num = Math.floor(num / 10000);
			unitPos++;
	  }
	 
	 return chnStr+""+a;
}

export const testLon = str => {
	const reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
	return reg.test(str)
}

export const testLat = str => {
	const reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
	return reg.test(str)
}



