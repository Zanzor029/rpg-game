import React, { Component } from 'react';
import { hideTooltip } from '../../actions/tooltipActions'
import { connect } from 'react-redux'
import './tooltip.css'


export class Tooltip extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        if (this.props.tooltipType == null) {
            return (
                null
            )
        }
        let leftPosition = this.props.tooltipProps.positionX + "px";
        let topPosition = this.props.tooltipProps.positionY + "px";
        let toolTipPositionStyle = {
            top: topPosition,
            left: leftPosition
        }
        if (this.props.tooltipType === "item") {
            const item = this.props.tooltipProps.object
            let weaponDiv = <div></div>
            if (item.ItemSlot === "Weapon") {
                weaponDiv =
                    <div className="TooltipWeaponStats">
                        <div className="TooltipWeaponStatsRowOne">
                            {item.MinValue} - {item.MaxValue} Damage  |  Speed {item.AttackSpeed}s
                        </div>
                        <div className="TooltipWeaponStatsRowTwo">
                            ({item.DPS} damage per second)
                        </div>
                    </div>

            }
            return (
                <div id="TooltipBackground" style={toolTipPositionStyle} >
                    <div className="TooltipItemName">
                        {item.Name}
                    </div>
                    <div className="TooltipItemSlot">
                        {item.ItemSlot}
                    </div>
                    <div className="TooltipWeaponStats">
                        {weaponDiv}
                    </div>
                    <div className="TooltipStats">
                        <div>{item.Armor > 0 && `${item.Armor} Armor`} </div>
                        <div>{item.Strength > 0 && `${item.Strength} Strength`} </div>
                        <div>{item.Agility > 0 && `${item.Agility} Agility`}</div>
                        <div>{item.Stamina > 0 && `${item.Stamina} Stamina`}</div>
                        <div>{item.Intellect > 0 && `${item.Intellect} Intellect`}</div>
                        <div>{item.Spirit > 0 && `${item.Spirit} Spirit`}</div>
                    </div>
                </div>

            )
        }

    }
}


const mapStateToProps = state => ({
    tooltipProps: state.tooltip.tooltipProps,
    tooltipType: state.tooltip.tooltipType,
    hideTooltip: state.hideTooltip
})

export default connect(mapStateToProps, { hideTooltip })(Tooltip)
