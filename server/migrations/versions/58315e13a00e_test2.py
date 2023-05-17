"""test2

Revision ID: 58315e13a00e
Revises: 0e6714a8e574
Create Date: 2023-05-16 20:24:20.478370

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58315e13a00e'
down_revision = '0e6714a8e574'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.add_column(sa.Column('keyword_map_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('color_map_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_cards_color_map_id_color_maps'), 'color_maps', ['color_map_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_cards_keyword_map_id_keyword_maps'), 'keyword_maps', ['keyword_map_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cards', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_cards_keyword_map_id_keyword_maps'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_cards_color_map_id_color_maps'), type_='foreignkey')
        batch_op.drop_column('color_map_id')
        batch_op.drop_column('keyword_map_id')

    # ### end Alembic commands ###
