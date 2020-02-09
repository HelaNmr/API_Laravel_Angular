<?php

namespace App\Http\Controllers\API;

use App\Models\Reply;
use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Response;
use Validator;

class TicketController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {

        $tickets = Ticket::where('user_id',auth()->user()->id)->get();
        return $this->sendResponse($tickets->toArray(), 'Tickets retrieved successfully.');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'category' => 'required',
            'subject' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $ticket = new Ticket();
        $ticket->category = $input['category'];
        $ticket->subject = $input['subject'];
        $ticket->content = $input['content'];
        $ticket->user_id = auth()->user()->id;
        $ticket->save();
        return $this->sendResponse($ticket->toArray(), 'Ticket created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $ticket = Ticket::find($id);
        if (is_null($ticket)) {
            return $this->sendError('Ticket not found.');
        }
        return $this->sendResponse($ticket->toArray(), 'Ticket retrieved successfully.');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Ticket $ticket
     * @return Response
     */
    public function update(Request $request, Ticket $ticket)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'category' => 'required',
            'subject' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $ticket->category = $input['category'];
        $ticket->subject = $input['subject'];
        $ticket->content = $input['content'];
        $ticket->user_id = auth()->user()->id;
        $ticket->save();
        return $this->sendResponse($ticket->toArray(), 'Ticket updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param Ticket $ticket
     * @return Response
     * @throws \Exception
     */
    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return $this->sendResponse($ticket->toArray(), 'Ticket deleted successfully.');
    }

    /**
     * Add Reply to ticket t.
     *
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function addReply(Request $request, $id)
    {
        $reply = new Reply();
        $reply->content = $request->input('content');
        $reply->ticket_id = $id;
        $reply->save();
        return $this->sendResponse($reply->toArray(), 'Reply added successfully.');
    }

    /**
     * Add Reply to ticket t.
     *
     * @param int $id
     * @return Response
     */
    public function replies($id)
    {
        $replies = Reply::where('ticket_id',$id)->get();
        return $this->sendResponse($replies, 'Replies retrieved successfully.');
    }

}
