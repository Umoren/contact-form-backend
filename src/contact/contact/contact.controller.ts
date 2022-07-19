import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDTO } from '../dto/create-contact.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';


@Controller('contact')
export class ContactController {

    constructor(private contactService: ContactService) { }

    @Get('contacts')
    async getContacts(@Res() res) {
        const contacts = await this.contactService.getContacts();
        return res.status(HttpStatus.OK).json(contacts);
    }

    @Get('contacts/:contactId')
    async getContact(@Res() res, @Param('contactId', new ValidateObjectId()) contactId) {
        const contact = await this.contactService.getContact(contactId);
        if (!contact) throw new NotFoundException('Contact does not exist!');
        return res.status(HttpStatus.OK).json(contact);
    }

    @Post('/contact')
    async addContact(@Res() res, @Body() createContactDTO: CreateContactDTO) {
        const newContact = await this.contactService.addContact(createContactDTO);
        return res.status(HttpStatus.OK).json({
            message: "Contact has been created successfully!",
            contact: newContact
        })
    }

    @Put('/edit')
    async editContact(
        @Res() res,
        @Query('contactId', new ValidateObjectId()) contactId,
        @Body() createContactDTO: CreateContactDTO
    ) {
        const editedContact = await this.contactService.editContact(contactId, createContactDTO);
        if (!editedContact) throw new NotFoundException('Contact does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Contact has been successfully updated',
            post: editedContact
        })
    }

    @Delete('/delete')
    async deleteContact(@Res() res, @Query('contactId', new ValidateObjectId()) contactId) {
        const deletedContact = await this.contactService.deleteContact(contactId);
        if (!deletedContact) throw new NotFoundException('Contact does not exist')
        return res.status(HttpStatus.OK).json({
            message: 'Contact has been deleted',
            contact: deletedContact
        })
    }

}
