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

