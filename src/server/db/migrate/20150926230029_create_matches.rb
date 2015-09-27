class CreateMatches < ActiveRecord::Migration
  def change
    create_table :matches do |t|

      t.timestamps null: false

      t.belongs_to :source, class_name: "User"
      t.belongs_to :target, class_name: "User"
      t.boolean :requited
    end
  end
end
