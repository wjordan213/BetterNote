class AddUserIdToTags < ActiveRecord::Migration
  def change
    remove_index(:tags, column: :title)
    add_column :tags, :user_id, :integer
    add_index :tags, [:title, :user_id], unique: true
  end
end
