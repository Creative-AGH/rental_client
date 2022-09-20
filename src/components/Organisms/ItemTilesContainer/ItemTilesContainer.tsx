import ItemTile from "../../Atoms/ItemTile/ItemTile"

const ItemTilesContainer = () => {
    return (
        <div>
            <ItemTile title='Test' description='Opis jakis' url='https://i.pravatar.cc/70' />
            <ItemTile title='Test2' description='Opis jakis elo' url='https://i.pravatar.cc/70' />
            <ItemTile title='Test3' description='Opis dupa' url='https://i.pravatar.cc/70' />
        </div>
    )
}

export default ItemTilesContainer