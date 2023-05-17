"""test3

Revision ID: 91bfa43784f3
Revises: 58315e13a00e
Create Date: 2023-05-16 20:42:42.037096

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '91bfa43784f3'
down_revision = '58315e13a00e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.drop_constraint('fk_cards_color_map_id_color_maps', type_='foreignkey')
        batch_op.drop_constraint('fk_cards_keyword_map_id_keyword_maps', type_='foreignkey')
        batch_op.drop_column('color_map_id')
        batch_op.drop_column('keyword_map_id')

    with op.batch_alter_table('color_maps', schema=None) as batch_op:
        batch_op.add_column(sa.Column('card_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_color_maps_card_id_cards'), 'cards', ['card_id'], ['id'])

    with op.batch_alter_table('keyword_maps', schema=None) as batch_op:
        batch_op.add_column(sa.Column('card_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_keyword_maps_card_id_cards'), 'cards', ['card_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('keyword_maps', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_keyword_maps_card_id_cards'), type_='foreignkey')
        batch_op.drop_column('card_id')

    with op.batch_alter_table('color_maps', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_color_maps_card_id_cards'), type_='foreignkey')
        batch_op.drop_column('card_id')

    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('keyword_map_id', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('color_map_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_cards_keyword_map_id_keyword_maps', 'keyword_maps', ['keyword_map_id'], ['id'])
        batch_op.create_foreign_key('fk_cards_color_map_id_color_maps', 'color_maps', ['color_map_id'], ['id'])

    # ### end Alembic commands ###
