<span class="item-label tsl" data-phase-id="d_p_location">所在地区 <i>*</i></span>
<div class="item item-street" id="J_ItemStreet">
  <span class="item-label tsl" data-phase-id="d_p_addressDetail">详细地址 <i>*</i></span>

  <div class="ks-combobox" id="J_ComboboxStreet" aria-pressed="false">
    <div class="ks-combobox-input-wrap">
        <textarea class="ks-combobox-input i-ta tsl" aria-combobox="list" role="combobox" autocomplete="off"
                  name="addressDetail" id="J_Street" aria-label="详细地址" placeholder="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"
                  data-inner_placeholder="d_p_input_inner_detailAddress" data-pattern="^[\s\S]{5,120}$"
                  data-msg="d_p_detailAddress_msg" data-ph="建议您如实填写详细收货地址，例如街道名称，门牌号码，楼层和房间号等信息"
                  data-spm-anchor-id="0.0.0.i3.5563175crAT7Iw"></textarea>
    </div>
  </div>
  <div class="msg-box">
    <div class="msg msg-error hide" id="J_MsgStreet" style="visibility: hidden;">
      <i></i>

      <div class="msg-cnt"></div>
    </div>
  </div>
</div>
<div class="item item-postcode" id="J_ItemPostCode">
  <span class="item-label tsl" data-phase-id="d_p_postCode">邮政编码 </span>
  <div class="item-warp">
    <input name="post" aria-label="邮政编码" maxlength="16" data-item="postcode" placeholder="如您不清楚邮递区号，请填写000000"
           data-inner_placeholder="d_p_input_inner_postCode" data-ph="如您不清楚邮递区号，请填写000000" data-pattern="^.{0,16}$"
           data-msg="d_p_postCode_msg" class="i-text tsl" id="J_PostCode" type="text" value="">
  </div>

  <div class="msg hide" id="J_MsgPostCode">
    <i></i>

    <div class="msg-cnt tsl" data-phase-id="d_p_postNotExit">邮编不存在</div>
  </div>
</div>
<div class="item item-name" id="J_ItemName">
  <span class="item-label tsl" data-phase-id="d_p_receiverName">收货人姓名 <i>*</i></span>
  <div class="item-warp">
    <input name="fullName" class="i-text tsl" aria-label="收货人姓名" type="text" id="J_Name" placeholder="长度不超过25个字符"
           data-inner_placeholder="d_p_input_inner_fullName" data-pattern="^.{2,25}$" data-msg="d_p_fullName_msg"
           data-ph="长度不超过25个字符" value="">
  </div>

  <div class="msg hide" id="J_MsgName">
    <i></i>

    <div class="msg-cnt"></div>
  </div>
</div>
<div class="item item-mobile" id="J_ItemMobile">
  <span class="item-label tsl" data-phase-id="d_p_mobileNumber">手机号码 </span>
  <input name="mobile" class="i-text tsl" aria-label="手机号码" type="text" id="J_Mobile" placeholder="电话号码、手机号码必须填一项"
         autocomplete="off" data-inner_placeholder="d_p_input_inner_mobile" data-pattern="^\d{6,20}$"
         data-ph="电话号码、手机号码必须填一项" data-msg="d_p_mobile_msg" value="">

  <div class="msg hide" id="J_MsgMobile">
    <i></i>

    <div class="msg-cnt"></div>
  </div>
</div>
<div class="item item-phone" id="J_ItemPhone">

  <span class="item-label tsl" data-phase-id="d_p_phoneNumber">电话号码 </span>
  <input name="phoneCode" maxlength="10" class="i-text i-text-short tsl" id="J_PhoneCode" aria-label="电话号码"
         placeholder="电话号码" data-inner_placeholder="d_p_input_inner_phoneCode" data-ph="电话号码" type="text" value=""> -
  <input type="hidden" class="tsl" value="" id="J_Phone" data-pattern="^\d{1,6}-\d{5,10}(?:-\d+)?$"
         data-msg="d_p_wrongFormat">

  <div class="msg hide" id="J_MsgPhone">
    <i></i>

    <div class="msg-cnt"></div>
  </div>
</div>
<div class="item item-set-default" id="j_ItemSetDefault">
  <input type="checkbox" class="i-chk" name="defaultAddress" id="J_SetDefault"> <label for="J_SetDefault" class="tsl"
                                                                                       data-phase-id="d_p_saveAsDefaultAddress">设置为默认收货地址</label>
</div>
<div class="item">
  <button type="submit" class=" btn  tsl" data-phase-id="d_p_saveSubmit">保存</button>
  <div class="msg hide" id="J_MsgSubmit">
    <i></i>
    <div class="msg-cnt"></div>
  </div>
</div>
