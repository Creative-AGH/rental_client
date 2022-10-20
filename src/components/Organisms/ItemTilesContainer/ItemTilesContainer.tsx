import ItemTile from '../../Atoms/ItemTile/ItemTile';

const ItemTilesContainer = () => {
  return (
    <div>
      <ItemTile
        title="Test"
        description="Lorem ipsum"
        imgUrl="https://i.pravatar.cc/70"
        itemData={{ item_id: 1, container_id: 'place1' }}
      />
      <ItemTile
        title="Test2"
        description="Lorem ipsum"
        imgUrl="https://i.pravatar.cc/71"
        itemData={{ item_id: 2, container_id: 'place2' }}
      />
      <ItemTile
        title="Test3"
        description="Lorem ipsum"
        imgUrl="https://i.pravatar.cc/72"
        itemData={{ item_id: 3, container_id: 'place3' }}
      />
    </div>
  );
};

export default ItemTilesContainer;
