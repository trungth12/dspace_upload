/*!
 * Custom code for things not available in JQM
 * 
 * Author: Pavan Malji
 * Date:  06-June-2012
 * 
 */

var deploymentSystem = "inis";
var mobileFolder = "m";
var mainHome = /*VIPURL*/"/inis/index.html";
var mobileHome = /*VIPURL*/"/inis/m/index.html";

if("PROD" == "EDIT") {
	deploymentSystem = "inis-edit";
} else if("PROD" == "QA") {
	deploymentSystem = "inis-qa";
} else {
	deploymentSystem = "inis";
}
 
function gotoMainSitePage(link) {
	var url = link.replace("/" + deploymentSystem + "/" + mobileFolder + "/", "/" + deploymentSystem + "/");
	
	$.ajax({
		type: "HEAD",
		async: false,
		url: url,
		context: document.body,
		success: function(){
			link = url;
		},
		error: function(){
			link = mainHome;
		},
		complete: function() {
			setCookie('inismain', 'true');
			document.location = link;
		}
	});
}
 
function scanlink(obj) {
 	try {
		var link = $(obj).attr('loc');
		var mainPageLink = ($(obj).attr('main-page-link') != undefined);
		
		if(mainPageLink) {
			gotoMainSitePage(link);
			return false;
		} else {
		
			var isInternalLink = (link.indexOf("/" + deploymentSystem + "/") != -1);

			var hasLink = ((link != undefined) && ($.trim(link).length > 0) && ($.trim(link) != '#') && ($.trim(link) != document.location));
			var hasDataRelAttr = ($(obj).attr('data-rel') != undefined);
			var doNotScanAttr = ($(obj).attr('do-not-scan') != undefined);


			if (doNotScanAttr || hasDataRelAttr || !hasLink || !isInternalLink) {
				return true;
			} else {

				var mobilelink = link;
				var isMobileLink = (link.indexOf("/" + deploymentSystem + "/" + mobileFolder + "/") != -1);

				if(!isMobileLink) {
					mobilelink = mobilelink.replace("/" + deploymentSystem + "/", "/" + deploymentSystem + "/" + mobileFolder + "/");
				}


				$.ajax({
					type: "HEAD",
					async: false,
					url: mobilelink,
					context: document.body,
					success: function(){
						link = mobilelink;
					},
					error: function(){
						if(isMobileLink) {
							link = link.replace("/" + deploymentSystem + "/" + mobileFolder + "/", "/" + deploymentSystem + "/");		  			
						}
					},
					complete: function() {
						window.location = link;
					}
				});
			}

			return false;
		}
	} catch(e) {
	}
	
	return true;
}


function IsOk(orderform) {
 
	var error = false;
	var errorColor = "#FFA6A6";

	orderform.First_Name______________.style.background = "none";
	orderform.Last_Name_______________.style.background = "none";
	orderform.Organization____________.style.background = "none";
	orderform.Street_Address__________.style.background = "none";
	orderform.City____________________.style.background = "none";
	orderform.Zip_Code________________.style.background = "none";
	orderform.Country_________________.style.background = "none";
	orderform.Email_Fax_______________.style.background = "none";


	if (orderform.First_Name______________.value == "") {
		orderform.First_Name______________.style.background = errorColor;
		error = true;
	}

	if (orderform.Last_Name_______________.value == "") {
			orderform.Last_Name_______________.style.background = errorColor;
			error = true;
	}

	if (orderform.Organization____________.value == "") {
		orderform.Organization____________.style.background = errorColor;
		error = true;
	}

	if(orderform.Liaison_Officer_________[1].checked && orderform.Liaison_Officer_________[1].value == "No") {
		if (orderform.Street_Address__________.value == "") {
				orderform.Street_Address__________.style.background = errorColor;
				error = true;
		}

		if (orderform.City____________________.value == "") {
				orderform.City____________________.style.background = errorColor;
				error = true;
		}

		if (orderform.Zip_Code________________.value == "") {
				orderform.Zip_Code________________.style.background = errorColor;
				error = true;
		}
	}

	if (orderform.Country_________________.selectedIndex == 0) {
			orderform.Country_________________.style.background = errorColor;
			error = true;
	}

	if (orderform.Email_Fax_______________.value == "") {
			orderform.Email_Fax_______________.style.background = errorColor;
			error = true;
	}

	if(error) {
		alert("Please fill the mandatory fields indicated by *");
		return false;
	}

	return true;
}
