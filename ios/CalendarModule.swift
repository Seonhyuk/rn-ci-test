//
//  CalendarModule.swift
//  MovieReminder
//
//  Created by 안선혁 on 2023/05/22.
//

import Foundation
import EventKit

@objc(CalendarModule)

class CalendarModule: NSObject {
  var store = EKEventStore()
  
  @objc func createCalendarEvent(_ timeStampInSec: Double, title: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejector reject: @escaping RCTPromiseRejectBlock) -> Void {
    store.requestAccess(to: .event) { granted, error in
      if (error != nil) {
        reject("permission_error", error?.localizedDescription, error)
        return
      }
      
      if (!granted) {
        reject("permission_denied", "Permission is Denied", nil)
        return
      }
      
      let event: EKEvent = EKEvent(eventStore: self.store)
      event.title = title
      event.startDate = Date(timeIntervalSince1970: timeStampInSec)
      event.endDate = Date(timeIntervalSince1970: timeStampInSec)
      event.isAllDay = true
      event.calendar = self.store.defaultCalendarForNewEvents
      
      do {
        try self.store.save(event, span: .thisEvent)
        resolve(nil)
      } catch {
        reject("event_failure", error.localizedDescription, error)
      }
    }
  }
  
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

