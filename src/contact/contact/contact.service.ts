import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IContact } from '../interfaces/contact.interface';
import { CreateContactDTO } from '../dto/create-contact.dto';

@Injectable()
export class ContactService {
    constructor(@InjectModel('Contact') private readonly contactModel: Model<IContact>) { }

    async getContacts(): Promise<IContact[]> {
        const contacts = await this.contactModel.find().exec();
        return contacts;
    }

    async getContact(contactId): Promise<IContact> {
        const contact = await this.contactModel.findById(contactId).exec();
        return contact;
    }

    async addContact(createContactDTO: CreateContactDTO): Promise<IContact> {
        const newContact = await new this.contactModel(createContactDTO);
        return newContact.save();
    }

    async editContact(contactId, createContactDTO: CreateContactDTO): Promise<IContact> {
        const editedContact = await this.contactModel
            .findByIdAndUpdate(contactId, createContactDTO, { new: true });
        return editedContact;
    }

    async deleteContact(contactId): Promise<any> {
        const deletedContact = await this.contactModel
            .findByIdAndRemove(contactId);
        return deletedContact;
    }

}
