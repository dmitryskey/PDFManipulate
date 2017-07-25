'use strict';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var $=require('jQuery');var USI9=function(){function USI9(lastName,firstName,middleInitial,otherNames,address,apptNumber,dob,city,state,zip){_classCallCheck(this,USI9);var nameFormat=/^[^A-Za-z ']+$/;var dateFormat=/^[^0-9/.]+$/;var zipFormat=/^[^0-9-]+$/;// E-Verify requirements
this._lastName=lastName;this._lastName.prop('maxLength',40);this._lastName.keypress(function(e){return String.fromCharCode(e.which).match(nameFormat)});// E-Verify requirements
this._firstName=firstName;this._firstName.prop('maxLength',25);this._firstName.keypress(function(e){return String.fromCharCode(e.which).match(nameFormat)});// E-Verify requirements
this._middleInitial=middleInitial;this._middleInitial.prop('maxLength',1);this._middleInitial.keypress(function(e){return String.fromCharCode(e.which).match(nameFormat)});// E-Verify requirements
this._otherNames=otherNames;this._otherNames.prop('maxLength',40);this._otherNames.keypress(function(e){return String.fromCharCode(e.which).match(nameFormat)});this._address=address;this._apptNumber=apptNumber;this._city=city;var stateCodes=['AK','AL','AR','AS','AZ','CA','CO','CT','DC','DE','FL','FM','GA','GU','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MH','MI','MN','MO','MP','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','PR','RI','SC','SD','TN','TX','UT','VA','VI','VT','WA','WI','WV','WY'];this._state=state;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=stateCodes[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var stateCode=_step.value;this._state.append('<option>'+stateCode+'</option>')}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}this._zip=zip;this._zip.keypress(function(e){return String.fromCharCode(e.which).match(zipFormat)});// E-Verify requirements
this._dob=dob;this._dob.keypress(function(e){return String.fromCharCode(e.which).match(dateFormat)});this._dob.datepicker()}_createClass(USI9,[{key:'validateFields',value:function validateFields(){var dateFormat=/^[\d{1,2}[/.]{1}\d{1,2}[/.]{1}\d{4}]+$/;var errorMessage='';if(this._lastName.val()===''){errorMessage+='- Please enter the First Name\r\n'}if(this._dob.val()===''||!this._dob.val().match(dateFormat)){errorMessage+='- Please enter the Date of Birth in the format mm/dd/yyyy\r\n'}if(errorMessage!==''){alert(errorMessage);return false}else{return true}}}]);return USI9}();$(document).ready(function(){var form=new USI9($('[name=LastName]'),$('[name=FirstName]'),$('[name=MiddleInitial]'),$('[name=OtherNames]'),$('[name=Address]'),$('[name=AppartmentNumber]'),$('[name=City]'),$('[name=State]'),$('[name=Zip]'),$('[name=DateOfBirth]'))});
//# sourceMappingURL=US I9.js.map