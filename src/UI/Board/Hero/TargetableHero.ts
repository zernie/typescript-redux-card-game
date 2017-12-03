import * as DnD from 'react-dnd';
import HeroCard, { HeroProps } from './Hero';
import { MinionProps } from '../Minion/Minion';
import { getMinions, isValidTarget, ownerMinions } from '../../../Minion';
import { CardType } from '../../../enums';

const collect: DnD.DropTargetCollector = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const spec: DnD.DropTargetSpec<HeroProps> = {
  drop: (props, monitor: DnD.DropTargetMonitor) => {
    const { character } = monitor.getItem() as MinionProps;

    return props.performAttack({
      id: props.character.id,
      source: character,
      target: props.character,
    });
  },
  canDrop: (props, monitor: DnD.DropTargetMonitor) => {
    const { character, entities } = monitor.getItem() as MinionProps;

    const enemyMinions = ownerMinions(
      props.character.owner,
      getMinions(entities)
    );

    return (
      props.character.owner !== character.owner &&
      isValidTarget(props.character, enemyMinions)
    );
  },
};

export default DnD.DropTarget([CardType.Minion, CardType.Hero], spec, collect)(
  HeroCard
);
