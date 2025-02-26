import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({
  name: 'users',
  database: 'myapp_db'
})
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'customer', enum: ['customer', 'admin'] }) // Default role is customer
  role: string;

  @Column({ default: false }) // Email verification status
  isVerified: boolean;
}
