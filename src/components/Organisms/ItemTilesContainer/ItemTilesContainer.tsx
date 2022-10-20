import ItemTile from '../../Atoms/ItemTile/ItemTile';

const ItemTilesContainer = () => {
  return (
    <div>
      <ItemTile
        title="Test"
        description="Lorem ipsum"
        imgUrl="https://i.pravatar.cc/70"
        itemData={{ item_id: 1, container_id: 40 }}
      />
      <ItemTile
        title="Test2"
        description="Lorem ipsum"
        imgUrl="https://i.pravatar.cc/71"
        itemData={{ item_id: 2, container_id: 116 }}
      />
      <ItemTile
        title="Test3"
        description="Lorem ipsum"
        imgUrl="https://i.pravatar.cc/72"
        itemData={{ item_id: 3, container_id: 125 }}
      />
    </div>
  );
};

export default ItemTilesContainer;
