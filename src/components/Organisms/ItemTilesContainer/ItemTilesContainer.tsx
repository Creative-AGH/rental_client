import ItemTile from '../../Atoms/ItemTile/ItemTile';

const ItemTilesContainer = () => {
  return (
    <div>
      <ItemTile title="Test" description="Lorem ipsum" url="https://i.pravatar.cc/70" />
      <ItemTile title="Test2" description="Lorem ipsum" url="https://i.pravatar.cc/71" />
      <ItemTile title="Test3" description="Lorem ipsum" url="https://i.pravatar.cc/72" />
    </div>
  );
};

export default ItemTilesContainer;