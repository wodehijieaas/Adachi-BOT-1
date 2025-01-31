const template =
`<div class="overview">
	<img class="background" :src="abyssBackground" alt="ERROR"/>
	<span class="title">{{ data.info }} 的深境螺旋概览</span>
	<div class="info">
		<span class="max-floor">最深抵达： {{ data.maxFloor }}</span>
		<span class="battle-times">挑战次数： {{ data.totalBattleTimes }}</span>
		<img class="star-img" src="../../public/images/abyss/star.png" alt="ERROR"/>
		<span class="star-num">{{ data.totalStar }}</span>
	</div>
	<div class="reveal">
		<span class="subtitle">出战次数</span>
		<CharacterList v-for="chars in reveal" :chars="chars" type="reveal"/>
	</div>
	<span class="subtitle">战斗数据榜</span>
	<div class="data-list">
		<DataRow v-for="i in 5" :title="titleList[i - 1]" :data="dataList[i - 1]" :line="i"/>
	</div>
</div>`;

import CharacterList from "./character-list.js";
import DataRow from "./data-row.js";
const { defineComponent, computed } = Vue;

export default defineComponent( {
	name: "AbyssOverview",
	template,
	components: {
		CharacterList,
		DataRow
	},
	props: {
		data: Object
	},
	setup( { data } ) {
		const arr = data.revealRank.map( el => {
			el.icon = el.avatarIcon;
			return el;
		} );
		const reveal = [ arr.splice( 0,4 ), arr ];
		
		const dataList = [ data.damageRank, data.defeatRank, data.takeDamageRank,
						   data.normalSkillRank, data.energySkillRank ];
		const titleList = [ "最强一击", "击破数", "承受伤害", "元素战技次数", "元素爆发次数" ]
		
		const abyssBackground = computed( () => {
			return "../../public/images/abyss/OverviewBackground.png";
		} );

		return {
			abyssBackground,
			reveal,
			dataList,
			titleList
		}
	}
} );