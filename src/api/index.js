/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
import axios from "axios";
import { message } from "antd";
import getUserInfo from "./getUserInfo";
import baseUrl from "./baseUrl";
import initReq from "./initReq";
let requestArr = [];
axios.interceptors.request.use(
  (config) => {
    if (requestArr.indexOf(config.url) < 0) {
      requestArr.push(config.url);
      return config;
    } else {
      return Promise.reject("请勿重复请求");
    }
  },
  (error) => {
    message.error("请求超时");
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    if (res.config.url === "https://ingtube-vod-prod.oss-cn-shanghai.aliyuncs.com") {
      return res;
    } else {
      if (res.data.error_code !== 0) {
        let error_description =
          typeof res.data.error_description !== "string" ? "系统错误" : res.data.error_description;
        message.error(error_description);
        if (res.data.error_code === 1002) {
          window.location.href = "/login";
        }
      }

      if (res.data.data == null) {
        res.data.data = {};
      }
      console.log(res.config.url);
      requestArr.splice(requestArr.indexOf(res.config.url), 1);
      return res.data;
    }
  },
  (error) => {
    message.error("服务请求异常");
    return Promise.reject(error);
  }
);

let userInfo;
let post = (path, data) => {
  userInfo = getUserInfo();
  let url = (/^\/v1|\/passport/.test(path) ? baseUrl[1] : baseUrl[0]) + path;
  let req = {
    source: "web",
    sid: userInfo.sid ? userInfo.sid : "",
    user_id: userInfo.user_id ? userInfo.user_id : "",
    data: data,
  };
  // console.log(url);
  return axios.post(url, initReq(req));
};
export default {
  /**************账户相关 */
  //账户登录

  login(data) {
    return post("/v1/passport/login", data);
  },
  //验证登录
  verify(data) {
    return post("/v1/passport/ticket/verify", data);
  },
  //修改秘密
  updataPassword(data) {
    return post("/v1/passport/password/modify", data);
  },
  queryBloggerInfo(data) {
    //查询博主信息
    return post("/admin/cp/apply/v1/list", data);
  },
  editBloggerInfoById(data) {
    // 编辑博主信息
    return post("/admin/cp/apply/v1/update", data);
  },
  verifyBlogger(data) {
    //审核
    return post("/admin/cp/apply/v1/verify", data);
  },
  refuseBlogger(data) {
    return post("/admin/cp/apply/v1/refuse", data);
  },
  postCompanyInfo(data) {
    // 提交品牌主信息
    return post("/admin/sponsor/account/v1/modify", data);
  },
  //获取配置文件列表
  listSchema(data) {
    return post("/admin/config/oss/v1/list", data);
  },
  //获取配置文件
  getSchema(data) {
    return post("/admin/config/oss/v1/get", data);
  },
  //删除配置文件
  deleteSchema(data) {
    return post("/admin/config/oss/v1/delete", data);
  },
  //更新配置文件
  createSchema(data) {
    return post("/admin/config/oss/v1/create", data);
  },
  /***************业务相关 */
  //获取用户列表
  listAdmin(data) {
    return post("/admin/account/user/v1/list", data);
  },
  //搜索博主列表
  cpSearch(data) {
    return post("/admin/cp/v1/search", data);
  },
  userSearch(data) {
    return post("/admin/cp/v1/detail", data);
  },
  // 搜索用户列表
  registeCpSearch(data) {
    return post("/admin/cp/bind/v1/user_list", data);
  },
  // 用户渠道绑定列表
  getCpBindedChannelList(data) {
    return post("/admin/cp/bind/v1/source_list", data);
  },
  // 强制解绑用户绑定的渠道
  forceUnbindChannel(data) {
    return post("/admin/cp/bind/v1/force_unbind", data);
  },
  //解冻冻结博主
  cpModify(data) {
    return post("/admin/cp/v1/update_status", data);
  },
  //商户列表
  sponsorSearch(data) {
    return post("/admin/sponsor/account/v1/search", data);
  },
  // 商户备注列表
  getSponsorRemark(data) {
    return post("/admin/sponsor/comment/v1/get", data);
  },
  // 添加商户备注
  addSponsorRemark(data) {
    return post("/admin/sponsor/comment/v1/add", data);
  },
  //修改商户信息
  sponsorModify(data) {
    return post("/admin/sponsor/account/v1/modify", data);
  },
  //搜索品牌
  brandSearch(data) {
    return post("/admin/brand/v1/list", data);
  },
  //新增或修改品牌
  brandModify(data) {
    return post("/admin/brand/v1/modify", data);
  },
  //类目列表
  // categoryList(data) {
  //   return post("/admin/category/v1/list", data);
  // },
  //类目新增或修改
  categoryModify(data) {
    return post("/admin/category/v1/modify", data);
  },

  //标签新增
  addNewLabel(data) {
    return post("/admin/tag/v1/add", data);
  },
  //标签修改
  userLabelModify(data) {
    return post("/admin/tag/v1/modify", data);
  },
  //获取用户标签
  userLabelList(data) {
    return post("/admin/tag/v1/list", data);
  },
  //标签删除
  userLabelDel(data) {
    return post("/admin/tag/v1/delete", data);
  },

  //获取私享订单互动量信息列表
  shareOrderList(data) {
    return post("/admin/share_order/v1/interaction_num_list", data);
  },
  //追杀博主
  killerCpList(data) {
    return post("/admin/cp/v1/killer/add", data);
  },
  //订单列表
  orderList(data) {
    return post("/admin/share_order/v1/list", data);
  },
  //导出订单
  orderExport(data) {
    return post("/admin/share_order/v1/export", data);
  },
  //订单详情
  orderDetail(data) {
    return post("/admin/share_order/v1/detail", data);
  },
  //订单变更历史
  orderHistoty(data) {
    return post("/admin/share_order/v1/history", data);
  },
  //订单变更状态
  orderUpdateStatus(data) {
    return post("/admin/share_order/v1/status", data);
  },
  // 新建订单
  newPayOrder(data) {
    return post("/admin/pay/sponsor/v1/add", data);
  },
  //获取支付订单列表
  getPayOrderList(data) {
    return post("/admin/pay/sponsor/v1/order_list", data);
  },
  //获取活动列表
  campaignList(data) {
    return post("/admin/campaign/rank/v1/list", data);
  },
  //获取活动评测列表
  apprasialList(data) {
    return post("/admin/campaign/rank/v1/order/list", data);
  },
  //添加评分
  appraisalRankAdd(data) {
    return post("/admin/campaign/rank/v1/add", data);
  },
  //博主账户详情
  getCpDetail(data) {
    return post("/admin/cp/v1/detail", data);
  },
  //获取博主标签列表
  getTagList(data) {
    return post("/admin/cp/v1/tag_list", data);
  },
  // 获取博主浮动标签列表
  getEmergeTagList(data) {
    return post("/admin/cp/v1/cp_tag_list", data);
  },
  //获取活动排期列表
  scheduleList(data) {
    return post("/admin/campaign/schedule/v1/list", data);
  },

  // 修改活动
  campaignModify(data) {
    return post("/admin/campaign/v1/update", data);
  },
  // 关闭活动
  campaignClose(data) {
    return post("/admin/campaign/v1/close", data);
  },
  //商品规格列表
  getProductionSpecList(data) {
    return post("/admin/production/v1/spec/list", data);
  },
  //获取活动详情
  getCampaignDetail(data) {
    return post("/admin/campaign/v1/detail", data);
  },

  //活动排期审核
  scheduleAudit(data) {
    return post("/admin/campaign/schedule/v1/audit", data);
  },
  //获取赏金活动列表
  campaignRewardList(data) {
    return post("/admin/campaign/reward/v1/list", data);
  },
  //获取赏金测评列表
  orderRewardList(data) {
    return post("/admin/campaign/reward/v1/order/list", data);
  },
  //赏金测评条件审核
  rewardAudit(data) {
    return post("/admin/campaign/reward/v1/audit", data);
  },
  //商户充值提现审核列表
  searchWithdraw(data) {
    return post("/admin/pay/sponsor/v1/withdraw/audit_list", data);
  },
  //商户充值提现审核
  confirmWithdraw(data) {
    return post("/admin/pay/sponsor/v1/withdraw/audit", data);
  },
  // 商户收入提现列表
  incomeWithdrawList(data) {
    return post("/admin/pay/sponsor/v1/income/audit_list", data);
  },
  // 商户收入提现审核
  incomeWithdrawVerify(data) {
    return post("/admin/pay/sponsor/v1/income/audit", data);
  },
  //博主提现列表
  getBbloggerWithdrawList(data) {
    return post("/admin/pay/cp/v1/withdraw_list", data);
  },
  //获取预览页面数据
  getPreviewData(data) {
    return post("/admin/campaign/schedule/v1/preview", data);
  },
  //增添角色
  addRole(data) {
    return post("/admin/account/role/v1/add", data);
  },
  //查询角色信息(人员列表是同一个)
  queryRoleInfo(data) {
    return post("/admin/account/role/v1/list", data);
  },
  //更新角色信息
  updateRoleInfo(data) {
    return post("/admin/account/role/v1/update", data);
  },
  //创建人员
  createAdmin(data) {
    return post("/admin/account/user/v1/create", data);
  },
  //修改人员信息
  updateAdminInfo(data) {
    return post("/admin/account/user/v1/update", data);
  },
  //粉丝物流
  fansExpress(data) {
    return post("/admin/share_order/v1/fans/list", data);
  },
  // 关闭粉丝物流订单
  closeFansExp(data) {
    return post("/admin/share_order/v1/fans/close", data);
  },
  //[手动发放映币] 获取充值记录
  getChargeList(data) {
    return post("/admin/pay/point/v1/list", data);
  },
  //提交充值
  submmitCharge(data) {
    return post("/admin/pay/point/v1/add", data);
  },
  // 退税列表
  getTaxList(data) {
    return post("/admin/pay/tax/v1/list", data);
  },
  // 填写发票信息，确认退税
  confirmTaxRefund(data) {
    return post("/admin/pay/tax/v1/confirm_refund", data);
  },
  // 重置退税
  resetTaxRefund(data) {
    return post("/admin/pay/tax/v1/reset_refund", data);
  },
  // 拒绝退税
  refuseTaxRefund(data) {
    return post("/admin/pay/tax/v1/refuse_refund", data);
  },
  // 获取博主所有类目信息
  getCategories(data) {
    return post("/admin/cp/category/v1/list", data);
  },
  // 评价列表评价
  rankEdit(data) {
    return post("/admin/campaign/rank/v1/edit", data);
  },
  //添加类目
  addCategory(data) {
    return post("/admin/cp/category/v1/add", data);
  },
  //修改博主信息
  cpDetailUpdate(data) {
    return post("/admin/cp/v1/update", data);
  },
  // 博主申请详情
  cpApplyDetail(data) {
    return post("/admin/cp/apply/v1/detail", data);
  },
  //获取消息推送列表
  noticeList(data) {
    return post("/admin/notice/sponsor/v1/list", data);
  },
  //创建消息推送模板
  noticeCreate(data) {
    return post("/admin/notice/sponsor/v1/create", data);
  },
  //获取物流信息
  getOrderExpress(data) {
    return post("/admin/express/v1/detail", data);
  },
  // 获取订单列表
  getFreezeList(data) {
    return post("/admin/share_order/v1/deposit/list", data);
  },
  // 押金扣除失败，执行履约
  unFreezeOrder(data) {
    return post("/admin/share_order/v1/deposit/unfreeze", data);
  },
  // 押金扣除失败，执行违约
  freezeOrder(data) {
    return post("/admin/share_order/v1/deposit/freeze", data);
  },
  // 删除微博链接
  delWeiboLink(data) {
    return post("/admin/cp/v1/manipulate", data);
  },
  // 保存草稿
  saveDraft(data) {
    return post("/admin/campaign/reward/v1/draft", data);
  },
  // 商品管理列表
  getProductionList(data) {
    return post("/admin/production/v1/list", data);
  },
  // 商品管理审核
  productionVerify(data) {
    return post("/admin/production/v1/modify", data);
  },
  // 商品购买
  getGoodsList(data) {
    return post("/admin/star/order/v1/list", data);
  },
  // 星选订单导出
  starOrderExport(data) {
    return post("/admin/star/order/v1/export", data);
  },
  // 工单列表 - 客户问题
  getCustomerIssues(data) {
    return post("/admin/ticket/customer/v1/list", data);
  },
  // 退货退款工单列表
  getRefoundList(data) {
    return post("/admin/ticket/refund/v1/list", data);
  },
  // 获取差评列表
  getProposalList(data) {
    return post("/admin/ticket/proposal/v1/list", data);
  },
  // 星选banner 配置列表
  starBannerList(data) {
    return post("/admin/config/app/v1/star_banner/list", data);
  },
  // 新增 修改banner配置
  starBannerPost(data) {
    return post("/admin/config/app/v1/star_banner/update", data);
  },
  // 测评工单审核
  reviewsVerify(data) {
    return post("/admin/ticket/proposal/v1/check", data);
  },
  // 解绑手机号
  unbindPhone(data) {
    return post("/admin/cp/v1/unbind_phone", data);
  },
  // 企业认证列表
  getBusinessLicenseList(data) {
    return post("/admin/sponsor/company_verify/v1/list", data);
  },
  // 企业认证审核
  verifyCompanyAuth(data) {
    return post("/admin/sponsor/company_verify/v1/confirm", data);
  },
  // 新增企业认证
  createCompanyAuth(data) {
    return post("/admin/sponsor/company_verify/v1/create", data);
  },
  // 保存企业认证信息
  saveCompanyAuthInfo(data) {
    return post("/admin/sponsor/company_verify/v1/save", data);
  },
  // 品牌授权列表
  brandAuthList(data) {
    return post("/admin/sponsor/brand_auth/v1/list", data);
  },
  // 审核品牌授权
  verifyBrandAuth(data) {
    return post("/admin/sponsor/brand_auth/v1/confirm", data);
  },
  // 品牌认证搜索
  brandAuthSearch(data) {
    return post("/admin/sponsor/brand_auth/v1/brand_search", data);
  },
  // 提交新的品牌认证
  newBrandAuth(data) {
    return post("/admin/sponsor/brand_auth/v1/create", data);
  },
  // 重置商家密码
  resetSponsorPass(data) {
    return post("/admin/sponsor/passport/v1/reset", data);
  },
  // 获取测评详情
  getAppraisalContent(data) {
    return post("/admin/campaign/appraisal/v1/content", data);
  },
  // 测评详情提交
  appraisalContentSubmit(data) {
    return post("/admin/campaign/appraisal/v1/content/tag", data);
  },
  // 获取商家信用分信息
  getCreditInfo(data) {
    return post("/admin/sponsor/credit/v1/get", data);
  },
  // 修改商家信用分信息
  modifyCreditInfo(data) {
    return post("/admin/sponsor/credit/v1/modify", data);
  },
  // 品牌授权保存
  brandAuthSave(data) {
    return post("/admin/sponsor/brand_auth/v1/save", data);
  },
  // 协商记录
  getCommentRecord(data) {
    return post("/admin/ticket/comment/v1/history", data);
  },
  // 工单留言
  leftMessage(data) {
    return post("/admin/ticket/comment/v1/left_message", data);
  },
  // 导出罚单
  exportGuaranteeFines(data) {
    return post("/admin/ensure/v2/ticket/export", data);
  },
  // 罚单列表
  finesList(data) {
    return post("/admin/ensure/v2/ticket/list", data);
  },
  // 罚单明细
  getFineDetail(data) {
    return post("/admin/ensure/v2/ticket/bill", data);
  },
  // 关闭罚单
  closeFine(data) {
    return post("/admin/ensure/v2/ticket/close", data);
  },
  // 线下退款
  confirmRefound(data) {
    return post("/admin/ensure/v2/bill/refund", data);
  },
  // 撤销app推送
  cancelAppNotice(data) {
    return post("/admin/notice/app/v1/cancel", data);
  },
  // 获取app 推送列表
  getAppNoticeList(data) {
    return post("/admin/notice/app/v1/list", data);
  },
  //获取app开屏/星选/私享列表 CMS
  getBannerOpenList(data) {
    return post("/admin/config/app/v1/banner/list", data);
  },
  //app星选/私享轮播和App开屏 新增 CMS
  bannerCreate(data) {
    return post("/admin/config/app/v1/banner/create", data);
  },
  //app星选/私享轮播和App开屏 修改 CMS
  bannerModify(data) {
    return post("/admin/config/app/v1/banner/update", data);
  },
  //app星选/私享轮播和app开屏 删除 CMS
  bannerDelete(data) {
    return post("/admin/config/app/v1/banner/delete", data);
  },
  //app星选/私享轮播 上移/下移 CMS
  bannerMove(data) {
    return post("/admin/config/app/v1/banner/move", data);
  },
  // 获取推送状态
  getNoticeStatus(data) {
    return post("/admin/notice/app/v1/status", data);
  },
  // 创建app推送
  createAppNotice(data) {
    return post("/admin/notice/app/v1/create", data);
  },
  // 获取信用分记录
  getCreditList(data) {
    return post("/admin/cp/credit/v1/list", data);
  },
  // 清除逾期记录
  clearOverdue(data) {
    return post("/admin/share_order/v1/reset/overdue", data);
  },
  // 清除差评记录
  clearViolate(data) {
    return post("/admin/share_order/v1/reset/violate", data);
  },
  // 活动海报列表
  webEditorList(data) {
    return post("/admin/config/post/v1/list", data);
  },
  // 新建海报
  webEditorCreate(data) {
    return post("/admin/config/post/v1/create", data);
  },
  // 更新海报
  webEditorUpdate(data) {
    return post("/admin/config/post/v1/update", data);
  },
  // 删除海报
  webEditorDelete(data) {
    return post("/admin/config/post/v1/delete", data);
  },
  //预审核列表
  preCheckList(data) {
    return post("/admin/appraisal/pre_check/v1/list", data);
  },
  //预审核通过
  preCheckCerify(data) {
    return post("/admin/appraisal/pre_check/v1/approve", data);
  },
  // 返利发放列表
  getFeedbackList(data) {
    return post("/admin/star/order/rebate/v1/list", data);
  },
  // 返利发放审核
  verifyFeedback(data) {
    return post("/admin/star/order/rebate/v1/verify", data);
  },
  // 返利发放的审核信息
  feedbackVerifyInfo(data) {
    return post("/admin/star/order/rebate/v1/verify_info", data);
  },
  // 悬赏审核列表
  rewardSettleList(data) {
    return post("/admin/campaign/reward_verify/v1/list", data);
  },
  // 悬赏审核
  rewardVerify(data) {
    return post("/admin/campaign/reward_verify/v1/verify", data);
  },
  // 取消悬赏审核
  refuseReward(data) {
    return post("/admin/share_order/v1/refuse_reward", data);
  },
  // 用户发薪
  cpWithdrawList(data) {
    return post("/admin/pay/cp/v2/withdraw/list", data);
  },
  // 发薪详情
  cpWithdrawDetail(data) {
    return post("/admin/pay/cp/v2/withdraw/detail", data);
  },
  // 发薪导出
  cpWithdrawExport(data) {
    return post("/admin/pay/cp/v2/withdraw/export", data);
  },
  // erp列表
  getErpList(data) {
    return post("/admin/erp/v1/list", data);
  },
  //手动置顶商品
  goTopProduct(data) {
    return post("/admin/production/v1/top", data);
  },
  // 热门单品列表
  getHotGoodsList(data) {
    return post("/admin/production/hot/v1/list", data);
  },
  // 搜索添加热门单品
  searchGoodForHotList(data) {
    return post("/admin/production/hot/v1/search", data);
  },
  // 返利活动详情
  getRebateGoodsList(data) {
    return post("/admin/star/rebate/v1/production_list", data);
  },
  // 返利活动详情
  getRebateCampaignDetail(data) {
    return post("/admin/star/rebate/v1/detail", data);
  },
  // 更新热门单品列表
  updateHotGoodsList(data) {
    return post("/admin/production/hot/v1/update", data);
  },
  // 关闭星选订单
  closeStartOrder(data) {
    return post("/admin/star/order/v1/close", data);
  },
  //获取免费次数列表
  getFreeList(data) {
    return post("/admin/sponsor/free_num/v1/list", data);
  },
  //手动增加免费次数
  addFreeNumber(data) {
    return post("/admin/sponsor/free_num/v1/create", data);
  },
  //获取雪花Id
  getSnowId(data) {
    return post("/admin/snowflake/v1/get", data);
  },
  //撤销博主处罚
  cancelBloggerPunish(data) {
    return post("/admin/cp/punish/v1/revoke", data);
  },
  //获取处罚博主列表
  getPunishList(data) {
    return post("/admin/cp/punish/v1/list", data);
  },
  //创建博主处罚
  createPunish(data) {
    return post("/admin/cp/punish/v1/create", data);
  },
  //获取博主现在有效处罚的结束时间
  getNowValidtime(data) {
    return post("/admin/cp/punish/v1/get_latest_time", data);
  },
  //获取关联账号列表
  getGroupList(data) {
    return post("/admin/cp/similar/v1/list", data);
  },
  //获取关联账号群组详情
  getGroupDetailList(data) {
    return post("/admin/cp/similar/v1/detail", data);
  },
  //关联疑似账号
  relatedGroup(data) {
    return post("/admin/cp/similar/v1/add", data);
  },
  //撤销疑似账号
  cancelGroup(data) {
    return post("/admin/cp/similar/v1/cancel", data);
  },
  // 获取app top导航列表
  getAppTopNavList(data) {
    return post("/admin/navigation/v1/list", data);
  },
  // 更新导航列表
  updateNavList(data) {
    return post("/admin/navigation/v1/update", data);
  },
  // 创建app 顶部导航
  createAppNav(data) {
    return post("/admin/navigation/v1/create", data);
  },
  // 删除app顶部导航
  deleteAppNav(data) {
    return post("/admin/navigation/v1/delete", data);
  },
  //获取社群人员列表（BA管理）
  getCommunityList(data) {
    return post("/admin/ba/user/v1/list", data);
  },
  //查询BA用户昵称（BA管理）
  getBaNameSearch(data) {
    return post("/admin/ba/user/v1/search", data);
  },
  //新增BA用户（BA管理）
  addNewBA(data) {
    return post("/admin/ba/user/v1/add", data);
  },
  //获取近期分享列表（BA管理）
  getCurrentShareList(data) {
    return post("/admin/ba/v1/detail/share", data);
  },
  //获得任务积分列表（BA管理）
  getScoreList(data) {
    return post("/admin/ba/v1/detail/score", data);
  },
  //注销恢复BA用户（BA管理）
  baStatusModify(data) {
    return post("/admin/ba/user/v1/update_status", data);
  },
  //任务分统计列表（任务分统计）
  getStatisticsList(data) {
    return post("/admin/ba/v1/score/list", data);
  },
  //获取查看详情上半部分 （任务分统计）
  getDetailTopList(data) {
    return post("/admin/ba/v1/score/detail", data);
  },
  //获取查看详情下半部分 （任务分统计）
  getDetailMonthList(data) {
    return post("/admin/ba/v1/score/month", data);
  },
  //获取分享记录管理
  getShareList(data) {
    return post("/admin/ba/v1/share/list", data);
  },
  //获取活动专场列表
  getAggregationEventList(data) {
    return post("/admin/aggregation/v1/campaign/list", data);
  },
  //获取聚合活动列表
  getCampaignList(data) {
    return post("/admin/aggregation/v1/list", data);
  },
  //移除活动推荐
  removeEvent(data) {
    return post("/admin/aggregation/v1/campaign/delete", data);
  },
  //增加活动推荐
  addNewEvent(data) {
    return post("/admin/aggregation/v1/campaign/create", data);
  },
  //查询活动专题Tab
  getTabList(data) {
    return post("/admin/aggregation/v1/tab", data);
  },
  //修改活动推荐
  modifyEvent(data) {
    return post("/admin/aggregation/v1/campaign/update", data);
  },
  //聚合活动创建
  aggregationEventCreate(data) {
    return post("/admin/aggregation/v1/create", data);
  },
  //聚合活动修改
  aggregationEventModify(data) {
    return post("/admin/aggregation/v1/update", data);
  },
  // 个人池列表
  getPoolList(data) {
    return post("/admin/sponsor/pool/v1/list", data);
  },
  // 获取池容量
  getPoolCapacity(data) {
    return post("/admin/sponsor/pool/v1/get_capacity", data);
  },
  // 移动客户池
  movePool(data) {
    return post("/admin/sponsor/pool/v1/move", data);
  },
  // 获取 bd 绩效列表
  getBdKpiList(data) {
    return post("/admin/finance/v1/list", data);
  },
  //获取标签关联后台类目模板
  getTagBackCategoryList(data) {
    return post("/admin/tag/category/v1/get", data);
  },
  //获取选择了的后台类目路径数组
  getSelectedTagList(data) {
    return post("/admin/tag/v1/relate_category", data);
  },
  //创建前台类目
  createFrontCategory(data) {
    return post("/admin/category/front/v1/create", data);
  },
  //删除前台类目
  deleteFrontCategory(data) {
    return post("/admin/category/front/v1/delete", data);
  },
  //编辑前台类目
  updateFrontCategory(data) {
    return post("/admin/category/front/v1/update", data);
  },
  //获取前台类目
  listFrontcategory(data) {
    return post("/admin/category/front/v1/list", data);
  },
  //获取前台类目关联后台类目模板
  getFrontcategoryTemp(data) {
    return post("/admin/category/front/template/v1/get", data);
  },
  //获取后台类目
  listBackCategory(data) {
    return post("/admin/category/v2/list", data);
  },
  //编辑后台类目
  updateBackCategory(data) {
    return post("/admin/category/v2/update", data);
  },
  //创建后台类目
  createBackCategory(data) {
    return post("/admin/category/v2/create", data);
  },
  //获取品牌主营类目模版(data)
  getBrandAuthCategory(data) {
    return post("/admin/sponsor/brand_auth/category/v1/get", data);
  },
  // 获取签约博主列表 ｜云账户管理列表 （两个页面使用的是同一个）
  getSignedBloggerList(data) {
    return post("/admin/cp/yun_contract/v1/list", data);
  },
  //添加联盟博主
  addSignedBlogger(data) {
    return post("/admin/cp/yun_contract/v1/add", data);
  },
  //查看博主签约详情
  getSignedDetail(data) {
    return post("/admin/cp/yun_contract/v1/detail", data);
  },
  //编辑，变更云账户信息
  updateSignedDetail(data) {
    return post("/admin/cp/yun_contract/v1/update", data);
  },
  //中止合同
  stopContract(data) {
    return post("/admin/cp/yun_contract/v1/stop", data);
  },
  //恢复合同
  resumeContract(data) {
    return post("/admin/cp/yun_contract/v1/resume", data);
  },
  //获取结算列表
  selectSettleList(data) {
    return post("/admin/yun_settlement/v1/unsettled/list", data);
  },
  //结算记录
  goSettle(data) {
    return post("/admin/yun_settlement/v1/settled", data);
  },
  //历史结算记录
  historySettledRecords(data) {
    return post("/admin/yun_settlement/v1/record/list", data);
  },
  //变更云账户的签约状态
  changeCloudAccountStatus(data) {
    return post("/admin/yun_settlement/v1/change_yun_status", data);
  },
  //类目搜索
  getCategorySearchList(data) {
    return post("/admin/category/v2/search", data);
  },
  //创建运营计划
  createOperationPlan(data) {
    return post("/admin/operation_plan/create", data);
  },
  closeOperationPlan(data) {
    return post("/admin/operation_plan/close", data);
  },
  // 运营计划列表
  getOperationPlanList(data) {
    return post("/admin/operation_plan/list", data);
  },
  //优惠券列表
  getCouponList(data) {
    return post("/admin/coupon/list", data);
  },
  //创建优惠券
  createNewCoupon(data) {
    return post("/admin/coupon/create", data);
  },
  closeCoupon(data) {
    return post("/admin/coupon/close", data);
  },
  //优惠券详情
  getCouponDetail(data) {
    return post("/admin/coupon/detail", data);
  },
  //优惠券更新
  updateCouponDetail(data) {
    return post("/admin/coupon/update", data);
  },
  //充值预算
  rechargeBudget(data) {
    return post("/admin/coupon/operation_budget/recharge", data);
  },
  //获取所有预算
  getBudgetTotal(data) {
    return post("/admin/coupon/operation_budget", data);
  },
  // 查看优惠券领取、使用列表
  getReceiveUsedList(data) {
    return post("/admin/coupon/receive_used_list", data);
  },
  // 定向发放
  targetedAssign(data) {
    return post("/admin/coupon/assign", data);
  },
  //更新博主标签
  updateTagList(data) {
    return post("/admin/cp/tag/update", data);
  },
  //获取博主已有标签
  getBloggerTagList(data) {
    return post("/admin/cp/tag/list", data);
  },
  // ft助手列表
  getExpiredFTList(data) {
    return post("/admin/sponsor/pool/v1/ft_list", data);
  },
  // -----------------------定制活动相关-----------------
  //获取联盟定制订单列表
  getCustomizedOrderList(data) {
    return post("/admin/customize/order/list", data);
  },
  //获取定制订单详情
  getCustomizedOrderDetail(data) {
    return post("/admin/customize/order/detail", data);
  },
  //完成审稿
  checkIdea(data) {
    return post("/admin/customize/order/idea_check", data);
  },
  //确认测评
  confirmAppraisal(data) {
    return post("/admin/customize/order/confirm", data);
  },
  //关闭订单
  closeCustomizedOrder(data) {
    return post("/admin/customize/order/close", data);
  },
  //审稿详情
  getIdeaDetail(data) {
    return post("/admin/customize/order/appraisal_info", data);
  },
  //获取战队积分列表
  getTeamScoreList(data) {
    return post("/admin/cp/custom/score/list", data);
  },
  //定制积分添加
  addCustomScore(data) {
    return post("/admin/cp/custom/score/add", data);
  },
  //定制积分删除
  deleteCustomScore(data) {
    return post("/admin/cp/custom/score/delete", data);
  },
  //获取联盟博主的战队名
  getBloggerTeamName(data) {
    return post("/admin/customize/cp/team_required", data);
  },
  //获取是否已经为联盟博主
  getBloggerStatus(data) {
    return post("/admin/customize/cp/league/status", data);
  },
  // ----------------积分-------------
  //---------------战队---------------
  getTeamList(data) {
    return post("/admin/customize/team/list", data);
  },
  //创建联盟战队
  createTeam(data) {
    return post("/admin/customize/team/create", data);
  },
  //修改联盟战队
  updateTeam(data) {
    return post("/admin/customize/team/update", data);
  },
  //获取成员详情
  getMemberDetail(data) {
    return post("/admin/customize/team/detail", data);
  },
  //修改战队队长
  updateTeamLeader(data) {
    return post("/admin/customize/team/leader_update", data);
  },
  //删除联盟战队
  deleteTeam(data) {
    return post("/admin/customize/team/delete", data);
  },
  //搜索联盟战队名
  getTeamName(data) {
    return post("/admin/customize/team/search", data);
  },
  // ------------------博主相关-----------------------
  //获取博主的云账户状态
  getBloggerYunMessage(data) {
    return post("/admin/cp/yun_contract/integration", data);
  },
  //博主昵称搜索ID
  getBloggerInfo(data) {
    return post("/admin/cp/helper/nickname", data);
  },
  //获取联盟博主列表
  getCustomBloggerList(data) {
    return post("/admin/customize/cp/list", data);
  },
  //添加联盟定制博主
  addCustomBlogger(data) {
    return post("/admin/customize/cp/add", data);
  },
  //修改联盟定制博主
  updateCustomBlogger(data) {
    return post("/admin/customize/cp/update", data);
  },
  //关闭联盟博主权限
  closeCustomAuthority(data) {
    return post("/admin/customize/cp/authority/close", data);
  },
  //获取平台价
  getPriceList(data) {
    return post("/admin/customize/cp/source_price", data);
  },
  //获取联盟博主的状态
  getBloggerMessage(data) {
    return post("/admin/customize/cp/integration", data);
  },
  //------------------博主平台价相关--------
  //  获取博主平台价列表
  getBloggerPriceList(data) {
    return post("/admin/cp/price/list", data);
  },
  // 博主渠道平台价添加
  createBloggerPrice(data) {
    return post("/admin/cp/price/add", data);
  },
  //修改平台价
  updateBloggerPrice(data) {
    return post("/admin/cp/price/update", data);
  },
  //博主渠道平台价历史
  bloggerPriceHistory(data) {
    return post("/admin/cp/price/log/list", data);
  },
  //------------------定制活动相关---------------
  getCustomActivityList(data) {
    return post("/admin/customize/campaign/list", data);
  },
  //获取定制活动详情
  getActivityDetail(data) {
    return post("/admin/customize/campaign/get", data);
  },
  //修改定制活动
  updateActivityDetail(data) {
    return post("/admin/customize/campaign/update", data);
  },
  //审核活动
  auditActivity(data) {
    return post("/admin/customize/campaign/audit", data);
  },
  customOrderHistory(data) {
    return post("/admin/customize/order/history", data);
  },
  //搜索商品
  productionSearch(data) {
    return post("/admin/production/v1/search", data);
  },
  //编辑标记
  updateMarkContent(data) {
    return post("/admin/star/order/rebate/mark/update", data);
  },
  //查看标记
  getMarkDescription(data) {
    return post("/admin/star/order/rebate/mark/get", data);
  },
};
