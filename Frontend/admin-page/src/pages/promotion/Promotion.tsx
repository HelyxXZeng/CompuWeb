import { PromotionDef } from "../../api/promotionAPI"
import PromotionInfo from "../../components/promotioninfo/PromotionInfo"
import "./promotion.scss"

interface Props {
  promotion: PromotionDef;
}

const Promotion = () => {
  return (
    <div className="promotion">
      <PromotionInfo/>
    </div>
  )
}

export default Promotion